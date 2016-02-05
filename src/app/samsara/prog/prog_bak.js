//

var Curves = require( './Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var Transform = Samsara.Core.Transform
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator



function Prog( context ) {
	this.wWidth = window.innerWidth
	this.halfwWidth = this.wWidth * 0.5
	this.wHeight = window.innerHeight
	this.halfwHeight = this.wHeight * 0.5

	this.index = 501
	this.posX = 0
	this.active = false
	this.err = false
	this.width = this.wWidth * 0.25
	this.height = 5



	this.x = new Transitionable( this.posX )
	this.opa = new Transitionable( 0 )

	this.xTrans = this.x.map( function ( v ) {
		return Transform.translateX( v )
	} )

	this.surf = new Surface( {
		size: [ this.width, this.height ],
		origin: [ 0.5, 0 ],
		opacity: this.opa,
		attributes: {
			id: 'prog_surf'
		},
		properties: {
			background: '#11C1F3'
		}
	} )

	this.swap = function () {
		if ( this.active == false || this.err == true ) {
			return
		}

		this.posX = ( this.posX ) ? 0 : this.wWidth
		this.x.set( this.posX, {
			duration: 1000,
			curve: 'easeOutBounce'
		}, function () {
			if ( this.active == false ) {
				this.x.reset( 0 )
				this.x.set( 0 )
				return
			}

			this.swap()
		}.bind( this ) )
	}

	this.done = function () {
		if ( this.err == true ) {
			return
		}

		this.active = false
		this.posX = 0

		this.opa.reset( 0 )

		this.surf.setProperties( {
			background: '#11C1F3'
		} )

	}

	this.start = function () {
		if ( this.active == true || this.err == true ) {
			return
		}

		this.active = true
		this.posX = 0

		this.opa.set( 1 )

		this.x.reset( 0 )

		this.swap()
	}

	this.stop = function () {
		if ( this.active == false || this.err == true ) {
			return
		}

		this.surf.setProperties( {
			background: '#33CD5F'
		} )

		this.opa.set( 0, {
			duration: 500
		}, function () {
			if ( this.active == false ) {
				return
			}
			this.done()
		}.bind( this ) )
	}

	this.error = function () {
		if ( this.err == true ) {
			return
		}
		
		this.err = true
		this.active = true
		this.surf.setProperties( {
			background: '#EF473A'
		} )

		this.opa.reset( 1 )
		this.opa.set( 1 )
		this.surf.setSize( [ this.wWidth, this.height ] )

		this.x.reset( this.wWidth * 1.5 )

		this.x.set( this.wWidth * 0.5, {
			duration: 1000,
			curve: Curves.outBounce
		}, function () {
			this.opa.set( 0, {
				duration: 1000
			}, function () {
				this.surf.setSize( [ this.width, this.height ] )
				this.err = false
				this.done()
			}.bind( this ) )
		}.bind( this ) )

	}

	context.add( {
		transform: this.xTrans
	} ).add( this.surf )

}





module.exports = Prog

//

