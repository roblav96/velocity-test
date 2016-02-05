//

var _$utils = require( './utils.js' )
var Curves = require( './Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var ContainerSurface = Samsara.DOM.ContainerSurface
var Timer = Samsara.Core.Timer
var Transform = Samsara.Core.Transform
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator



function sMenu( context ) {
	// this.wWidth = window.innerWidth
	// this.halfwWidth = this.wWidth * 0.5
	// this.wHeight = window.innerHeight
	// this.halfwHeight = this.wHeight * 0.5

	const wWidth = window.innerWidth

	this.index = 301
	this.shown = false
	this.showing = false
	this.temp = [ {}, {}, {}, {}, {}, {}, {}, {} ]

	this.width = _.mathClamp( 250, 0, wWidth * 0.8 )
	this.height = 50

	this.surfs = []
	this.nodes = []
	this.scales = []
	this.scalesTrans = []
	this.layout = new SequentialLayout( {
		direction: 1
	} )

	this.y = new Transitionable( 0 )

	this.yTrans = this.y.map( function ( v ) {
		return Transform.translate( [ wWidth * 0.5, v + 50 ] )
	}.bind( this ) )

	this.touched = function ( i ) {
		if ( !_.isFunction( this.temp[ i ].click ) ) {
			return
		}

		this.scales[ i ].reset( 1.2 )
		this.temp[ i ].click()

		this.scales[ i ].set( 1, {
			duration: 100
		}, function () {
			this.close()
		}.bind( this ) )

	}

	_.forEach( this.temp, function ( v, i ) {
		this.nodes[ i ] = new ContainerSurface( {
			size: [ this.width, this.height ],
			origin: [ 0.5, 1 ]
		} )

		this.surfs[ i ] = new Surface( {
			content: '<ul class="list"><li class="item">' + i + '</li></ul>',
			size: [ this.width, this.height ],
			origin: [ 0.5, 1 ]
		} )

		this.temp[ i ].click = null
		this.nodes[ i ].on( 'touchstart', function () {
			this.touched( i )
		}.bind( this ) )

		this.scales[ i ] = new Transitionable( 1 )
		this.scalesTrans[ i ] = this.scales[ i ].map( function ( value ) {
			return Transform.scale( [ value, value ] )
		} )

		this.nodes[ i ].add( {
			transform: this.scalesTrans[ i ]
		} ).add( this.surfs[ i ] )

	}.bind( this ) )

	this.layout.addItems( this.nodes )

	this.open = function ( temp ) {
		if ( this.shown == true ) {
			return
		}

		this.showing = true

		_$utils.events.emit( 'samsara.mMenu.close' )

		var i, len = 8
		for ( i = 0; i < len; i++ ) {
			if ( temp[ i ] ) {
				var content = '<ul class="list"><li class="item">' + temp[ i ]._text + '</li></ul>'
				if ( temp[ i ]._icon ) {
					content = '<ul class="list"><li class="item item-icon-left"><i class="icon ' + temp[ i ]._icon + '"></i> ' + temp[ i ]._text + '</li></ul>'
				}

				this.surfs[ i ].setContent( content )

				this.temp[ i ].click = null
				if ( temp[ i ]._click ) {
					this.temp[ i ].click = temp[ i ]._click
				}

			}
			//  else {
			// 	// this.surfs[ i ].setContent( '<ul class="list"><li class="item">' + i + '</li></ul>' )
			// 	this.temp[ i ].click = null
			// }
		}

		Timer.after( function () {
			this.y.set( -( 49 + ( ( temp.length ) * 50 ) ), {
				duration: 200,
				curve: Curves.outBack
			}, function () {
				this.shown = true
				this.showing = false
			}.bind( this ) )
		}.bind( this ), 2 )

	}.bind( this )

	this.close = function ( now ) {
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
			curve: Curves.easeIn
		}, function () {
			Timer.after( function () {
				var i, len = this.temp.length
				for ( i = 0; i < len; i++ ) {
					this.surfs[ i ].setContent( '' )
					this.temp[ i ].click = null
				}

			this.y.reset( 0 )
			this.shown = false
			this.showing = false

			}.bind( this ), 10 )
		}.bind( this ) )

	}.bind( this )





	context.add( {
		align: [ 0, 1 ],
		transform: this.yTrans
	} ).add( this.layout )

}





















































module.exports = sMenu

//

