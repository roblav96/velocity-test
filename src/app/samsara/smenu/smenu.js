//

var _$utils = require( '../../utils.js' )
var Curves = require( '../Curves.js' )
// var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var ContainerSurface = Samsara.DOM.ContainerSurface
var Timer = Samsara.Core.Timer
var Transform = Samsara.Core.Transform
var LayoutNode = Samsara.Core.LayoutNode
var View = Samsara.Core.View
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator
var sMenu_SURF = require( './smenu-surf.js' )



module.exports = View.extend( {

	initialize: function () {

		this.wWidth = window.innerWidth
		this.wHeight = window.innerHeight

		this.index = 301
		this.shown = false
		this.showing = false
		this.temp = [ {}, {}, {}, {}, {}, {}, {}, {} ]
		this.width = _.mathClamp( 250, 0, this.wWidth * 0.75 )
		this.height = 50

		this.surfs = []
		this.layout = new SequentialLayout( {
			direction: 1
		} )

		this.y = new Transitionable( 0 )

		var i, len = this.temp.length
		for ( i = 0; i < len; i++ ) {
			this.surfs[ i ] = new sMenu_SURF( {
				index: i,
				width: this.width,
				height: this.height
			} )
		}

		this.layout.addItems( this.surfs )

		this.add( {
			align: [ 0.5, 1 ],
			transform: Transform.translateY( 50 )
		} ).add( {
			transform: this.y.map( function ( v ) {
				var value = v
				return Transform.translateY( value )
			} )
		} ).add( this.layout )

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



	open: function ( temp ) {
		if ( this.shown == true ) {
			return
		}

		// _$utils.events.emit( 'samsara.mMenu.close' )
		this.showing = true

		var i, len = temp.length
		for ( i = 0; i < len; i++ ) {
			this.surfs[ i ].update( temp[ i ] )
		}

		this.y.set( -( 49 + ( ( len ) * 50 ) ), {
			duration: 200,
			curve: 'easeOut'
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
			this.y.set( 0 )
			this.y.reset( 0 )
			this.showing = false
			this.shown = false
			return
		}

		this.y.set( 0, {
			duration: 250,
			curve: 'easeIn'
		}, function () {
			this.shown = false
			this.showing = false
		}.bind( this ) )
	}







} )






























































//

