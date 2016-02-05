//

var Loki = require( 'lokijs' )
var dexie = require( './db-dexie.js' )
var _$utils = require( './utils.js' )


/*===========================
=            _$DB           =
===========================*/

module.exports = DB

function DB( opts ) {

	// this.cache = {
	// 	flush: false,
	// 	insert: [],
	// 	update: [],
	// 	remove: []
	// }

	// console.log( 'this >', this )

	// {
	// 	"name": "geo",
	// 	"schema": "uuid, stamp, xid",
	// 	"indices": [
	// 		"uuid",
	// 		"stamp",
	// 		"xid"
	// 	]
	// }

	this.opts = opts
	this.db = this.opts.name

	// this.cache[ this.db ] = {
	// 	flush: false,
	// 	insert: [],
	// 	update: [],
	// 	remove: []
	// }

	this.loki = new Loki.Collection( this.db, {
		indices: this.opts.indices,
		unique: this.opts.indices[ 0 ]
	} )

	var xid = Lockr.get( 'user.xid' )
	if ( _.isUndefined( xid ) ) {
		// return
	}

	// 	this.init()

	// }

	// DB.prototype.init = function () {

	this.loaded = Promise.resolve().bind( this ).then( function () {

		if ( this.db == 'geos' ) {
			return null
		}

		if ( this.db == 'activities' ) {
			return dexie[ this.db ].orderBy( 'stamp' ).reverse().limit( 50 ).toArray()
		}

		return dexie[ this.db ].toArray()

	} ).then( function ( docs ) {

		// console.warn( this.db )
		// console.log( 'docs >', JSON.stringify( docs, true, 4 ) )
		// console.log( 'this.loki.data >', JSON.stringify( this.loki.data, true, 4 ) )

		if ( !_.isEmpty( docs ) ) {
			var i, len = docs.length
			for ( i = 0; i < len; i++ ) {
				this.loki.insert( docs[ i ] )
			}
		}

		this.loki.on( 'insert', this.insert.bind( this ) )
		this.loki.on( 'update', this.update.bind( this ) )
		this.loki.on( 'delete', this.remove.bind( this ) )

		return Promise.resolve()

	} ).catch( function ( err ) {
		console.error( err )
		console.error( err.stack )
	} )

}

DB.prototype.cFlush = []
DB.prototype.cache = []

DB.prototype.flush = function () {
	this.flush.push( this.db )
	this.loki.removeDataOnly()
	this.save()
}

DB.prototype.insert = function ( doc ) {
	console.log( 'INSERT > doc >', doc )

	this.cache.push( {
		db: this.db,
		action: 'insert',
		doc: doc
	} )
	this.save()

	if ( this.db == 'contacts' ) {
		var send = _.pick( doc, 'id', 'uname' )
		_$utils.events.emit( 'db.temp.insert', send )
	} else if ( this.db == 'activities' ) {
		_$utils.events.emit( 'socketUpdate.activities', doc )
	}

}

DB.prototype.update = function ( doc ) {
	// console.log( 'UPDATE > doc >', doc )

	this.cache.push( {
		db: this.db,
		action: 'update',
		doc: doc
	} )
	this.save()

	if ( this.db == 'activities' ) {
		_$utils.events.emit( 'socketUpdate.activities' )
	}

}

DB.prototype.remove = function ( doc ) {
	// console.log( 'REMOVE > doc >', doc )

	if ( this.cFlush.indexOf( this.doc ) != -1 ) {
		return
	}

	this.cache.push( {
		db: this.db,
		action: 'remove',
		id: doc[ this.opts.indices[ 0 ] ]
	} )
	this.save()

	if ( this.db == 'contacts' ) {
		_$utils.events.emit( 'db.temp.remove', doc.uname )
	}

}

DB.prototype.save = _.debounce( function () {

	console.warn( 'this.cFlush >', this.cFlush )
	console.warn( 'this.cache >', this.cache )

	var that = {
		cFlush: _.uniq( this.cFlush ),
		cache: this.cache,
		len: this.cache.length,
		t: _.now()
	}

	Promise.resolve().bind( that ).then( function () {

		return dexie.transaction( 'rw', dexie.activities, dexie.boundaries, dexie.contacts, dexie.geos, function ( activities, boundaries, contacts, geos ) {

			var dex = {
				activities: activities,
				boundaries: boundaries,
				contacts: contacts,
				geos: geos
			}

			var dbs = [
				'activities',
				'boundaries',
				'contacts',
				'geos'
			]

			var i, len = dbs.length
			for ( i = 0; i < len; i++ ) {
				if ( this.cFlush.indexOf( dbs[ i ] ) != -1 ) {
					console.warn( 'flushing' )
					dex[ dbs[ i ] ].delete()
				}
			}

			// console.log( 'this.len >', this.len )
			// console.log( 'this.cache.length >', this.cache.length )

			var i, len = this.len
			for ( i = 0; i < len; i++ ) {
				var doc = _.omit( this.cache[ i ].doc, '$loki', 'meta' )
				if ( this.cache[ i ].action == 'insert' ) {
					dex[ this.cache[ i ].db ].add( doc ).catch( function () {} )
				} else if ( this.cache[ i ].action == 'update' ) {
					dex[ this.cache[ i ].db ].put( doc ).catch( function () {} )
				} else if ( this.cache[ i ].action == 'remove' ) {
					dex[ this.cache[ i ].db ].delete( this.cache[ i ].id ).catch( function () {} )
				}
			}

			console.log( '_.now() - this.t >', _.now() - this.t )

			return this.len

		}.bind( this ) )

	} ).bind( this ).then( function ( len ) {

		console.warn( 'SAVE' )
		console.log( 'len >', len )

		this.cache = _.drop( this.cache, len )
		this.cFlush = []

		// console.log( 'leftovers > this.cache.length >', this.cache.length )

	} ).catch( function ( err ) {
		console.error( err )
		console.error( err.stack )
	} )



}, 250, {
	maxWait: 1000
} )













































//

