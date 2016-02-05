//

var DB = require( './db-object.js' )
var Temp = require( './db-temp.js' )
var dexie = require( './db-dexie.js' )
var _$utils = require( './utils.js' )



_$utils.events.once( 'db.opened', function () {
	console.info( 'db.opened' )

	var proms = []
	var tables = dexie._tables
	var i, len = tables.length
	for ( i = 0; i < len; i++ ) {
		var db = new DB( tables[ i ] )
		this[ tables[ i ].name ] = db.loki
		proms.push( db.loaded )
	}

	var temp = new Temp()
	this.temp = temp.loki
	proms.push( temp.loaded )

	Promise.all( proms ).then( function () {
		_$utils.events.emit( 'db.ready' )
	} ).catch( function ( err ) {
		console.error( err )
	} )

}.bind( this ) )


this.putit = function ( activities, contacts, boundaries, geos ) {
	
	// console.log( 'activities >', activities )
	// console.log( 'contacts >', contacts )
	// console.log( 'boundaries >', boundaries )
	// console.log( 'geos >', geos )
	
	var i, len = activities.length
	for ( i = 0; i < len; i++ ) {
		this.activities.insert( activities[ i ] )
	}
	
	var i, len = contacts.length
	for ( i = 0; i < len; i++ ) {
		this.contacts.insert( contacts[ i ] )
	}
	
	var i, len = boundaries.length
	for ( i = 0; i < len; i++ ) {
		this.boundaries.insert( boundaries[ i ] )
	}
	
	var i, len = geos.length
	for ( i = 0; i < len; i++ ) {
		this.geos.insert( geos[ i ] )
	}

}



this.putitlogin = function ( response ) { // DEV for login
	console.log( 'putitlogin > response >', response )

	var contacts = response
	var i, len = contacts.length
	for ( i = 0; i < len; i++ ) {
		contacts[ i ].num = _.random( 0, 999 )
		this.contacts.insert( contacts[ i ] )
	}

}

this.putitsocket = function ( response ) {
	console.log( 'putitsocket > response >', response )

	// var geos = response.geos
	// var i, len = geos.length
	// for ( i = 0; i < len; i++ ) {
	// 	var doc = JSON.parse( geos[ i ].doc )
	// 	doc.xid = geos[ i ].xid
	// 	doc.stamp = geos[ i ].stamp
	// 	doc.uuid = doc.xid + doc.stamp
	// 	console.log( 'doc >', JSON.stringify( doc, true, 4 ) )
	// 	dexie.geo.add( doc )
	// }

	// var actives = response.actives
	// var i, len = actives.length
	// for ( i = 0; i < len; i++ ) {
	// 	var doc = JSON.parse( actives[ i ] )
	// 	doc.uuid = doc.xid + doc.stamp
	// 	console.log( 'doc >', JSON.stringify( doc, true, 4 ) )
	// 	dexie.activities.add( doc )
	// }

}



































if ( ENV_DEVELOPMENT == true ) {
	window.db = this
}
module.exports = this








//

