//

var _$utils = require( '../../utils.js' )
var Curves = require( '../Curves.js' )
var Samsara = require( 'samsarajs' )
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
var Differential = Samsara.Streams.Differential
var sBar_SURF = require( './sbar-surf.js' )



module.exports = View.extend( {

	initialize: function () {

		this.wWidth = window.innerWidth
		this.wHeight = window.innerHeight

		this.index = 451
		this.width = this.wWidth * 0.25
		this.height = 49
		this.temp = [ {}, {}, {}, {}, {}, {} ]

		this.surfs = []
		this.layout = new SequentialLayout( {
			direction: 0
		} )

		this.input = new TouchInput( {
			direction: TouchInput.DIRECTION.X,
			scale: 1.5
		} )

		var i, len = this.temp.length
		for ( i = 0; i < len; i++ ) {
			this.surfs[ i ] = new sBar_SURF( {
				index: i,
				width: this.width,
				height: this.height
			} )
			this.input.subscribe( this.surfs[ i ].surf )
		}

		this.layout.addItems( this.surfs )



		this.x = new Transitionable( 0 )
		this.xDiff = new Differential()
		this.xDiff.subscribe( this.x )
		this.xAccu = new Accumulator( 0, {
			min: -this.width,
			max: this.width
		} )
		this.xAccu.subscribe( this.input.pluck( 'delta' ) )
		this.xAccu.subscribe( this.xDiff )

		this.yDiff = new Differential( {
			scale: 2
		} )
		this.yDiff.subscribe( this.input.pluck( 'clientY' ) )
		this.yAccu = new Accumulator( 0 )
		this.yAccu.subscribe( this.yDiff )

		this.swipeYThreshold = 40
		this.clickThreshold = 20
		this.didClick = false
		this.touching = false

		this.input.on( 'start', function ( pay ) {
			this.yAccu.set( 0 )
			this.x.reset()

			this.didClick = false
			this.touching = true

			var x = pay.clientX
			this.timeout = Timer.after( function () {
				this.clickHoldFn( x )
			}.bind( this ), 25 )

			_$utils.events.emit( 'samsara.mMenu.close' )
			_$utils.events.emit( 'samsara.sMenu.close' )

		}.bind( this ) )

		this.input.on( 'end', function ( pay ) {

			var abs = Math.abs( this.xAccu.get() ) + Math.abs( this.yAccu.get() )
			if ( abs < this.clickThreshold && this.didClick == false && this.timeout ) {
				var i = this.getSurfByPos( pay.clientX )
				if ( _.isFunction( this.surfs[ i ].click ) ) {
					this.didClick = true
					this.surfs[ i ].doClick()
				}
			}
			
			if ( this.timeout ) {
				Timer.clear( this.timeout )
				this.timeout = null
			}

			this.centerIt()

		}.bind( this ) )

		this.yAccu.on( 'update', function ( pay ) {
			if ( this.touching == false || this.didClick == true ) {
				return
			}

			var y = Math.abs( pay )
			if ( y >= this.height ) {
				_$utils.events.emit( 'samsara.mMenu.open' )
				this.didClick = true
				this.centerIt()
				return
			}

		}.bind( this ) )

		this.xAccu.on( 'update', function ( pay ) {
			if ( this.touching == false || this.didClick == true ) {
				return
			}

			if ( Math.abs( pay ) >= this.width ) {
				if ( pay > 0 ) {

					if ( _.isFunction( this.surfs[ 0 ].surf.click ) ) {
						var classes = this.surfs[ 0 ].surf.getClassList()
						if ( classes.indexOf( 'sBar-active' ) == -1 ) {
							this.surfs[ 0 ].surf.addClass( 'sBar-active' )
						}

						this.didClick = true

						if ( this.temp[ 0 ].href != true ) {
							this.temp[ 0 ].click()
							Timer.after( function () {
								this.centerIt()
							}.bind( this ), 5 )
							return
						}

						Timer.after( function () {
							this.temp[ 0 ].click()
						}.bind( this ), 5 )
					}

				} else {

					if ( _.isFunction( this.temp[ 5 ].click ) ) {
						var classes = this.surfs[ 5 ].surf.getClassList()
						if ( classes.indexOf( 'sBar-active' ) == -1 ) {
							this.surfs[ 5 ].surf.addClass( 'sBar-active' )
						}

						this.didClick = true

						if ( this.temp[ 5 ].href != true ) {
							this.temp[ 5 ].click()
							Timer.after( function () {
								this.centerIt()
							}.bind( this ), 5 )
							return
						}

						Timer.after( function () {
							this.temp[ 5 ].click()
								// Timer.after( function () {
								// 	this.centerIt( true )
								// }.bind( this ), 5 )
						}.bind( this ), 5 )

					}
				}
			}




		}.bind( this ) )








		this.add( {
			align: [ 0, 1 ],
			transform: Transform.translate( [ -this.width * 0.5, 0 ] )
		} ).add( {
			transform: this.xAccu.map( function ( v ) {
				var value = v
				return Transform.translateX( value )
			} )
		} ).add( this.layout )

	},

	getSurfByPos: function ( posX ) {
		if ( _.inRange( posX, 0, this.width ) ) {
			return 1
		} else if ( _.inRange( posX, this.width, this.width * 2 ) ) {
			return 2
		} else if ( _.inRange( posX, this.width * 2, this.width * 3 ) ) {
			return 3
		} else if ( _.inRange( posX, this.width * 3, this.width * 4 ) ) {
			return 4
		} else {
			console.error( 'this.getSurfByPos >' )
			console.error( 'WTF NOT IN RANGE???' )
		}
	},

	centerIt: function ( now ) {
		if ( now == true ) {
			this.xAccu.set( 0 )
			this.yAccu.set( 0 )
			this.x.halt()
			this.x.reset()
			return
		}

		this.x.halt()
		this.x.reset( this.xAccu.get() )
		this.x.set( 0, {
			duration: 250,
			curve: Curves.outBack
		} )
	},

	clickHoldFn: function ( x ) {
		Timer.clear( this.timeout )
		this.timeout = null

		console.log( 'x >', x )
	},

	update: function ( temp ) {

		var i, len = temp.length
		for ( i = 0; i < len; i++ ) {

			var sendi = {}

			var classes = ''
			if ( i == 1 ) {
				classes = ' sBar-left-' + temp[ 0 ]._color
			}
			if ( i == 4 && temp[ 5 ]._color ) {
				classes = ' sBar-right-' + temp[ 5 ]._color
			}
			var icon = ''
			if ( temp[ i ]._icon ) {
				icon = ' ' + temp[ i ]._icon
			}
			var text = ''
			if ( temp[ i ]._text ) {
				text = temp[ i ]._text
			}
			sendi.content = '<div class="tabs tabs-icon-top' + classes + '"><a class="tab-item"><i class="icon' + icon + '"></i>' + text + '</a></div>'

			sendi.href = null
			if ( temp[ i ]._href ) {
				sendi.href = true
			}
			sendi.click = null
			if ( temp[ i ]._click ) {
				sendi.click = temp[ i ]._click
			}
			sendi.clickHold = null
			if ( temp[ i ]._clickHold ) {
				sendi.clickHold = temp[ i ]._clickHold
			}

			if ( i >= 1 && i <= 4 && this.surfs[ i ].hidden == true ) {
				this.surfs[ i ].show()
			}

			this.surfs[ i ].update( sendi )

		}

		this.surfs[ 0 ].resetClasses( temp[ 0 ]._color )
		this.surfs[ 5 ].resetClasses( temp[ 5 ]._color )

	}







} )






























































//

