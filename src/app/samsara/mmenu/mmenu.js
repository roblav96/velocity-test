//

var _$utils = require( '../../utils.js' )
var Curves = require( '../Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var ContainerSurface = Samsara.DOM.ContainerSurface
var Transform = Samsara.Core.Transform
var LayoutNode = Samsara.Core.LayoutNode
var View = Samsara.Core.View
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator
var mMenu_SURF = require( './mmenu-surf.js' )



module.exports = View.extend( {

	initialize: function () {
		
		// console.warn( 'mmenu init' )
		
		this.wWidth = window.innerWidth
		this.wHeight = window.innerHeight

		this.index = 401
		this.width = 100
		this.height = 80
		this.shown = false
		this.showing = false
		this.activeClass = ''

		this.temp = [ {
			text: "S.O.S",
			icon: "ion-help-buoy",
			activeState: 'help',
			index: 0
		}, {
			text: "Map",
			icon: "ion-map",
			state: "map.index",
			activeState: 'map',
			index: 1
		}, {
			text: "My Convoy",
			icon: "ion-person-stalker",
			state: "contacts.index",
			activeState: 'contacts',
			index: 2
		}, {
			text: "Activities",
			icon: "ion-ios-pulse-strong",
			state: "activity.index",
			activeState: 'activity',
			index: 3
		}, {
			text: "Settings",
			icon: "ion-settings",
			state: "settings.index",
			activeState: 'settings',
			index: 4
		} ]

		this.surfs = []
		this.layout = new SequentialLayout( {
			direction: 1
		} )

		this.x = new Transitionable( -100 )
		// this.opa = new Transitionable( 0 )

		this.xTrans = this.x.map( function ( v ) {
			var value = v
			return Transform.translateX( value )
		} )

		var i, len = this.temp.length
		for ( i = 0; i < len; i++ ) {
			this.surfs[ i ] = new mMenu_SURF( {
				theTemp: this.temp[ i ],
				temp: this.temp
			} )
		}

		this.layout.addItems( this.surfs )







		this.add( {
			align: [ 0, 1 ],
			transform: Transform.translate( [ -1, -449 ] ) // -1 to fix the tiny bit on the screen
			// opacity: this.opa
		} ).add( {
			transform: this.xTrans,
		} ).add( this.layout )


		// _$utils.events.on( 'samsara.mMenu.open', this.open.bind( this ) )
		// _$utils.events.on( 'samsara.mMenu.close', this.close.bind( this ) )


	},



	toggle: function () {
		if ( this.showing == true ) {
			return
		}

		if ( this.shown == true ) {
			this.close()
		} else {
			this.open()
		}
	},



	open: function () {
		if ( this.shown == true ) {
			return
		}

		_$utils.events.emit( 'samsara.sMenu.close' )
		this.showing = true

		// this.opa.set( 1, {
		// 	duration: 200
		// } )
		this.x.set( 0, {
			duration: 200,
			curve: Curves.outBack
		}, function () {
			this.shown = true
			this.showing = false
		}.bind( this ) )

	},



	close: function ( now ) {
		if ( this.shown == false ) {
			return
		}

		this.showing = true

		if ( now == true ) {
			// this.opa.set( 0 )
			// this.opa.reset( 0 )
			this.x.set( -100 )
			this.x.reset( -100 )
			this.showing = false
			this.shown = false
			return
		}

		// this.opa.set( 0, {
		// 	duration: 250,
		// 	curve: Curves.easeIn
		// } )
		this.x.set( -100, {
			duration: 250,
			curve: Curves.easeIn
		}, function () {
			this.shown = false
			this.showing = false
		}.bind( this ) )
	}








} )






























































//

