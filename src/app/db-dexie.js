//

var _$utils = require( './utils.js' )



var version = 1
var name = 'convoy.db_14'
var tables = [ {
	name: 'contacts',
	schema: 'id, uname'
}, {
	name: 'boundaries',
	schema: 'id, type'
}, {
	name: 'activities',
	schema: 'uuid, type, stamp, xid'
}, {
	name: 'geos',
	schema: 'uuid, stamp, xid'
} ]



var stores = {}
var i, len = tables.length
for ( i = 0; i < len; i++ ) {
	stores[ tables[ i ].name ] = tables[ i ].schema
	tables[ i ].indices = tables[ i ].schema.split( ', ' )
}

var dexie = new Dexie( name )
dexie.version( version ).stores( stores )
	// dexie.open()

dexie._version = version
dexie._name = name
dexie._tables = tables

var that = {
	dexie: dexie
}
Promise.resolve().bind( that ).then( function () {
	return this.dexie.open()
} ).catch( function ( err ) {
	console.warn( '_$db.init > FIRST catch >' )
	console.error( err )
	console.error( err.stack )
	navigator.notification.alert( 'DATABASE NOT SUPPORTED ON DEVICE!', null, 'FATAL ERROR!!!', ':(' )
} ).then( function () {
	return _$utils.events.emit( 'db.opened' )
} ).catch( function ( err ) {
	console.warn( '_$db.init > SECOND catch >' )
	console.error( err )
	console.error( err.stack )
} )



module.exports = dexie
























































//

