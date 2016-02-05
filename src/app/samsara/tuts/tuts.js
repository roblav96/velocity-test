//

var _$utils = require( '../../utils.js' )
var Curves = require( '../Curves.js' )
// var Samsara = require( 'samsarajs' )
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



module.exports = View.extend( {

	initialize: function () {

		this.wWidth = window.innerWidth
		this.wHeight = window.innerHeight

		this.index = 601
		this.top = 0
		this.shown = false
		this.showing = false

		this.y = new Transitionable( -this.wHeight )
		this.scales = new Transitionable( 0.5 )

		this.surf = new Surface( {
			size: [ this.wWidth, this.wHeight - 44 - 49 - this.top ],
			origin: [ 0.5, 0 ],
			opacity: this.opa,
			content: 'haiii',
			classes: [ 'help-surf' ],
			properties: {
				color: 'white',
				background: "rgba(0, 0, 0, 0.8)"
			}
		} )

		this.surf.on( 'touchstart', this.close.bind( this ) )

		this.add( {
			align: [ 0.5, 0 ],
			transform: this.scales.map( function ( v ) {
				var value = v
				return Transform.scale( [ value, value ] )
			} )
		} ).add( {
			transform: this.y.map( function ( v ) {
				var value = v + 44
				return Transform.translateY( value )
			} )
		} ).add( this.surf )

	},

	open: function ( temp ) {
		if ( this.shown == true ) {
			return
		}

		this.showing = true
		navigator.vibrate( 50 )

		this.surf.setContent( temp )

		var duration = 500
		var curve = Curves.outBack
		this.scales.set( 1, {
			duration: duration,
			curve: curve
		} )
		this.y.set( 0, {
			duration: duration,
			curve: curve
		}, function () {
			this.shown = true
			this.showing = false
		}.bind( this ) )

	},

	close: function ( now ) {
		if ( this.shown == false ) {
			return
		}

		if ( now == true ) {
			this.scales.set( 0.5 )
			this.y.set( -this.wHeight )
			return
		}

		this.showing = true

		var duration = 400
		var curve = 'easeIn'
		this.scales.set( 0.5, {
			duration: duration,
			curve: curve
		} )
		this.y.set( -this.wHeight, {
			duration: duration,
			curve: curve
		}, function () {
			this.shown = false
			this.showing = false
		}.bind( this ) )

	}


} )






























































//

