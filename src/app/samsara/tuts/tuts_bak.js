//

var Curves = require( './Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var Timer = Samsara.Core.Timer
var Transform = Samsara.Core.Transform
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator



function Tuts( context ) {
	this.wWidth = window.innerWidth
	this.halfwWidth = this.wWidth * 0.5
	this.wHeight = window.innerHeight
	this.halfwHeight = this.wHeight * 0.5

	this.index = 601
	this.top = 0
	this.shown = false
	this.showing = false



	this.y = new Transitionable( -this.wHeight )
	this.opa = new Transitionable( 1 )
	this.scale = new Transitionable( 1 )

	this.yTrans = this.y.map( function ( v ) {
		return Transform.translate( [ this.wWidth * 0.5, v + this.top + 44 ] )
	}.bind( this ) )
	this.scaleTrans = this.scale.map( function ( v ) {
		return Transform.scale( [ v, v ] )
	} )

	this.surf = new Surface( {
		size: [ this.wWidth, this.wHeight - 44 - 49 - this.top ],
		origin: [ 0.5, 0 ],
		opacity: this.opa,
		content: '',
		classes: [ 'help-surf' ],
		properties: {
			color: 'white',
			background: "rgba(0, 0, 0, 0.8)"
		}
	} )

	this.surf.on( 'touchstart', function () {
		this.close()
	}.bind( this ) )

	this.open = function ( temp ) {
		if ( this.shown == true ) {
			return
		}

		this.showing = true
		navigator.vibrate( 50 )

		this.surf.setContent( temp )

		Timer.after( function () {
			var duration = 250
			var curve = Curves.outBack

			this.opa.set( 1, {
				duration: duration,
				curve: curve
			} )
			this.scale.set( 1, {
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
		}.bind( this ), 2 )

	}

	this.close = function ( now ) {
		if ( this.shown == false ) {
			return
		}

		if ( now == true ) {
			this.opa.set( 0 )
			this.scale.set( 0.5 )
			this.y.set( -this.wHeight )
			return
		}

		this.showing = true

		var duration = 500
		var curve = Curves.easeIn

		this.opa.set( 0, {
			duration: duration,
			curve: curve
		} )
		this.scale.set( 0.5, {
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







	context.add( {
		transform: this.yTrans
	} ).add( {
		transform: this.scaleTrans
	} ).add( this.surf )

}

















































module.exports = Tuts

//

