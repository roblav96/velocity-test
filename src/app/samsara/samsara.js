//

var _$utils = require( '../utils.js' )
// var Samsara = require( 'samsarajs' )
var Context = Samsara.DOM.Context

// var tuts = require( './tuts.js' )
var _prog = require( './prog/prog.js' )
var _mMenu = require( './mmenu/mmenu.js' )
var _sMenu = require( './smenu/smenu.js' )
var _sBar = require( './sbar/sbar.js' )
var _tuts = require( './tuts/tuts.js' )



this.tuts = {}
this.prog = {}
this.mMenu = {}
this.sMenu = {}
this.sBar = {}

var init = function () {

	var context = new Context()
	context.setPerspective( 1000 )

	this.prog = new _prog()
	context.add( this.prog )
	this.mMenu = new _mMenu()
	context.add( this.mMenu )
	this.sMenu = new _sMenu()
	context.add( this.sMenu )
	this.sBar = new _sBar()
	context.add( this.sBar )
	this.tuts = new _tuts()
	context.add( this.tuts )



	context.mount( document.body )

	/*=====  MAIN MENU  ======*/
	// _$utils.events.on( 'samsara.mMenu.open', this.mMenu.open.bind( this ) )
	// _$utils.events.on( 'samsara.mMenu.close', mMenu.close )
	// _$utils.events.on( 'sos-bar-header', _$samsara.mMenu.sosBarHeader )
	// _$utils.events.on( 'samsara.activities', _$samsara.mMenu.activities )

	/*=====  SIDE MENU  ======*/
	// _$utils.events.on( 'samsara.sMenu.open', _$samsara.sMenu.open )
	// _$utils.events.on( 'samsara.sMenu.close', _$samsara.sMenu.close )

	/*=====  SWIPE BAR  ======*/
	// _$utils.events.on( 'samsara.sBar.centerIt', _$samsara.sBar.centerIt )

	/*=====  OTHER  ======*/
	// _$utils.events.on( 'samsara.fixMenus', _$samsara.fixMenus )

}
document.addEventListener( "DOMContentLoaded", init.bind( this ) )

// document.addEventListener( "DOMContentLoaded", _$samsara.init )

this.setGpuSettings = function ( bool, platform ) {
	console.warn( '_$samsara.setGpuSettings' )
}


this.fixMenus = function ( now ) {
	// _$samsara.mMenu.close( now )
	// _$samsara.sMenu.close( now )
	// _$samsara.tuts.close( now )
	// 	// _$samsara.quickie.close( now )
	// _$samsara.sBar.centerIt( now )
}





































module.exports = this



//

