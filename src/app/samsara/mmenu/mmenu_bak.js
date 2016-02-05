//

var _$utils = require( './utils.js' )
var Curves = require( './Curves.js' )
var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var ContainerSurface = Samsara.DOM.ContainerSurface
var Transform = Samsara.Core.Transform
var View = Samsara.Core.View
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator



function mMenu( context ) {
	this.wWidth = window.innerWidth
	this.halfwWidth = this.wWidth * 0.5
	this.wHeight = window.innerHeight
	this.halfwHeight = this.wHeight * 0.5

	this.index = 401
	this.width = 100
	this.height = 80
	this.shown = false
	this.showing = false
	this.activeClass = ''

	this.temp = {}
	this.temp[ 'help' ] = {
		text: "S.O.S",
		icon: "ion-help-buoy",
		index: 0
	}
	this.temp[ 'map' ] = {
		text: "Map",
		icon: "ion-map",
		state: "map.index",
		activeState: 'map',
		index: 1
	}
	this.temp[ 'contacts' ] = {
		text: "My Convoy",
		icon: "ion-person-stalker",
		state: "contacts.index",
		activeState: 'contacts',
		index: 2
	}
	this.temp[ 'activity' ] = {
		text: "Activities",
		icon: "ion-ios-pulse-strong",
		state: "activity.index",
		activeState: 'activity',
		index: 3
	}
	this.temp[ 'settings' ] = {
		text: "Settings",
		icon: "ion-settings",
		state: "settings.index",
		activeState: 'settings',
		index: 4
	}

	this.surfs = []
	this.nodes = []
	this.scales = []
	this.scalesTrans = []
	this.layout = new SequentialLayout( {
		direction: 1
	} )

	this.x = new Transitionable( -100 )
	this.opa = new Transitionable( 0 )

	this.xTrans = this.x.map( function ( v ) {
		var val = v
		return Transform.translate( [ val, -449 ] )
	} )

	_.forEach( this.temp, function ( v, k ) {
		var i = v.index

		this.nodes[ i ] = new ContainerSurface( {
			size: [ this.width, this.height ]
		} )

		var content = '<div class="list tabs side-tab tabs-icon-top"><li class="item tab-item"><i class="icon ' + v.icon + '"></i>' + v.text + '</li></div>'
		if ( k == "help" ) {
			content = '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ' + v.icon + '"></i>' + v.text + '</li></div>'
		}

		this.surfs[ i ] = new Surface( {
			content: content,
			size: [ this.width, this.height ]
		} )

		this.surfs[ i ].on( 'touchstart', function () {
			this.hrefPrep( k, i )
		}.bind( this ) )

		this.scales[ i ] = new Transitionable( 1 )
		this.scalesTrans[ i ] = this.scales[ i ].map( function ( value ) {
			return Transform.scale( [ value, 1 ] )
		} )

		this.nodes[ i ].add( {
			transform: this.scalesTrans[ i ]
		} ).add( this.surfs[ i ] )

	}.bind( this ) )

	this.layout.addItems( this.nodes )





	this.toggle = function () {
		if ( this.showing == true ) {
			return
		}

		if ( this.shown == true ) {
			this.close()
		} else {
			this.open()
		}
	}

	this.open = function () {
		if ( this.shown == true ) {
			return
		}

		_$utils.events.emit( 'samsara.sMenu.close' )
		this.showing = true

		this.opa.set( 1, {
			duration: 200
		} )
		this.x.set( 0, {
			duration: 200,
			curve: Curves.outBack
		}, function () {
			this.shown = true
			this.showing = false
		}.bind( this ) )
	}.bind( this )

	this.close = function ( now ) {
		if ( this.shown == false ) {
			return
		}

		this.showing = true

		if ( now == true ) {
			this.opa.set( 0 )
			this.opa.reset( 0 )
			this.x.set( -100 )
			this.x.reset( -100 )
			this.showing = false
			this.shown = false
			return
		}

		this.opa.set( 0, {
			duration: 250,
			curve: Curves.easeIn
		} )
		this.x.set( -100, {
			duration: 250,
			curve: Curves.easeIn
		}, function () {
			this.shown = false
			this.showing = false
		}.bind( this ) )
	}.bind( this )



	this.hrefPrep = function ( key, index ) {
		if ( _$router._currentRoute.name == this.temp[ key ].state ) {
			_$utils.events.emit( 'samsara.fixMenus' )
			return
		}

		var curName = _$router._currentRoute.name.split( '.' )[ 0 ]
		if ( curName == 'public' ) {
			_$utils.events.emit( 'samsara.fixMenus' )
			return
		}

		if ( key == 'help' ) {
			_$router.app.openSOS()
			return
		}

		var iFrom = this.temp[ curName ].index
		var direct = 'left'
		if ( iFrom > index ) {
			direct = 'down'
		} else if ( iFrom < index ) {
			direct = 'up'
		}

		this.scales[ index ].set( 1.25 )

		_$router.go( {
			name: this.temp[ key ].state,
			query: {
				direction: direct
			}
		} )

		_.delay( function () {
			this.scales[ index ].set( 1 )
		}.bind( this ), 10 )

	}



	this.setActiveClass = function ( toState ) {
		var ts = toState.split( '.' )[ 0 ]

		if ( ts != this.activeClass ) {
			this.activeClass = ts

			if ( this.activeClass == 'public' ) {
				return
			}

			var i, len = this.surfs.length
			for ( i = 0; i < len; i++ ) {
				this.surfs[ i ].removeClass( 'mMenu-active' )
			}

			var i = this.temp[ this.activeClass ].index
			this.surfs[ i ].addClass( 'mMenu-active' )
		}
	}



	this.sosBarHeader = function ( drill ) {
		if ( C_EMERGENCY == true ) {
			this.surfs[ 0 ].addClass( 'mMenu-emergency' )
			var str = "ACTIVE"
			if ( drill == true ) {
				str = str + "<br>DRILL"
			}
			this.surfs[ 0 ].setContent( '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ion-help-buoy"></i>' + str + '</li></div>' )
			return
		}
		this.surfs[ 0 ].removeClass( 'mMenu-emergency' )
		this.surfs[ 0 ].setContent( '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ion-help-buoy"></i>S.O.S</li></div>' )
	}.bind( this )

	this.activities = function ( bool ) {
		if ( bool == true ) {
			this.surfs[ 3 ].addClass( 'mMenu-balanced' )
		} else {
			this.surfs[ 3 ].removeClass( 'mMenu-balanced' )
		}
	}.bind( this )



	context.add( {
		align: [ 0, 1 ],
		transform: this.xTrans,
		opacity: this.opa
	} ).add( this.layout )

}





module.exports = mMenu

//

