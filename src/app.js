//

var _$db = require( "./app/db.js" )
	// var _$samsara = require( "./app/samsara.js" )
var _$utils = require( "./app/utils.js" )


var Vue = require( 'vue' )
Vue.config.debug = false
var VueRouter = require( "vue-router" )
var VueTouch = require( 'vue-touch' )
Vue.use( VueRouter )
Vue.use( VueTouch )




_.mixin( {
	'parseBool': function ( bool ) {
		if ( _.isString( bool ) ) {
			bool = bool.toLowerCase()
		}
		switch ( bool ) {
		case true:
		case "true":
		case "t":
		case 1:
		case "1":
		case "on":
		case "yes":
			return true
		case false:
		case "false":
		case "f":
		case 0:
		case "0":
		case "off":
		case "no":
			return false
		default:
			return undefined
		}
	}
} )

_.mixin( {
	'mathClamp': function ( x, a, b ) {
		return Math.min( Math.max( x, a ), b )
	}
} )

_.mixin( {
	'getMoment': function ( stamp, seconds ) {
		var str = 'h:mm A'
		if ( seconds == true ) {
			str = 'h:mm:ss A'
		}
		return moment( stamp ).calendar( _.now(), {
			sameDay: str,
			lastDay: '[Yesterday @] h:mm A',
			lastWeek: '[Past] ddd [@] h:mm A',
			sameElse: 'ddd MMM D [@] h:mm A'
		} )
	}
} )

_.mixin( {
	'strInsert': function ( str, index, value ) {
		return str.substr( 0, index ) + value + str.substr( index )
	}
} )

_.mixin( {
	'parsePhone': function ( numb ) {
		numb = numb.match( /\d/g )
		numb = numb.join( "" )
		numb = numb.substring( numb.length - 10, numb.length )
		numb = "1" + numb
		return numb
	}
} )

_.mixin( {
	'prettyPhone': function ( numb ) {
		numb = _.parsePhone( numb )
		numb = numb.substring( numb.length - 10, numb.length )
		numb = numb.replace( /(\d{3})(\d{3})(\d{4})/, "$1-$2-$3" )
		return numb
	}
} )

_.mixin( {
	'sMenuPrep': function ( temp ) {
		var i, len = temp.length
		for ( i = 0; i < len; i++ ) {
			if ( temp[ i ]._click ) {
				temp[ i ]._click = true
			}
		}
		return temp
	}
} )



VueTouch.registerCustomEvent( 'doubletap', {
	type: 'tap',
	threshold: 3,
	interval: 300,
	taps: 2
} )

VueTouch.registerCustomEvent( 'quicktaphold', {
	type: 'press',
	threshold: 10,
	time: 250
} )

VueTouch.registerCustomEvent( 'quintap', {
	type: 'tap',
	threshold: 3,
	interval: 300,
	taps: 5
} )

VueTouch.registerCustomEvent( 'taphold', {
	type: 'press',
	threshold: 10,
	time: 500
} )

VueTouch.registerCustomEvent( 'swipeleft', {
	type: 'swipe',
	velocity: 0.5,
	threshold: 10,
	direction: HM_DIRECTION_LEFT
} )

VueTouch.registerCustomEvent( 'swiperight', {
	type: 'swipe',
	velocity: 0.5,
	threshold: 10,
	direction: HM_DIRECTION_RIGHT
} )

VueTouch.registerCustomEvent( 'taphelphold', {
	type: 'press',
	threshold: 100,
	time: 1000
} )

var _$App = Vue.extend( {
	data: function () {
		var data = {}
		data.idk = "butt munch"
		return data
	},
	ready: function () {
		// console.warn( 'SREADDYYYY' )

		var arr = [
			'register',
			'about',
			'login'
		]

		// setTimeout( function () {
		// 	_$router.go( {
		// 		name: 'public.' + arr[ _.random( 0, 2 ) ]
		// 	} )
		// }, 2000 )
	}
} )



_$router = new VueRouter( {
	// abstract: false,
	// hashbang: false,
	// root: '/',
	// history: true
} )

_$router.beforeEach( function ( trans ) {

	if ( _.isEmpty( trans.from ) ) { // during deviceready/first load it transes
		trans.next()
		return
	}

	if ( !window.plugins ) {
		trans.next()
		return
	}

	window.plugins.nativepagetransitions.slide( {
		direction: 'left'
	}, function () {
		trans.next()
	} )

} )

_$router.afterEach( function ( trans ) {

	// console.log( '_$router.afterEach > trans >', trans )

	Lockr.set( 'location.hash', location.hash )

} )





_$router.map( {

	'/public': {
		component: require( './routes/public/tabs/tabs.js' ),
		subRoutes: {
			'/login': {
				component: require( './routes/public/login/login.js' ),
				name: 'public.login'
			},
			'/about': {
				component: require( './routes/public/about/about.js' ),
				name: 'public.about'
			},
			'/register': {
				component: require( './routes/public/register/register.js' ),
				name: 'public.register'
			}
		}
	}

} )

_$router.redirect( {
	'*': '/public/home'
} )









var dbReady = false
var deviceReady = false

var start = function () {

	console.warn( 'START VUE APP' )

	if ( window.cordova ) {
		window.plugins.nativepagetransitions.globalOptions.duration = 250
		window.plugins.nativepagetransitions.globalOptions.iosdelay = -1
		window.plugins.nativepagetransitions.globalOptions.androiddelay = -1
		window.plugins.nativepagetransitions.globalOptions.winphonedelay = -1
		window.plugins.nativepagetransitions.globalOptions.slowdownfactor = 3

		if ( device.platform == "iOS" ) {
			var el = document.getElementById( 'app' )
			el.style.top = '20px'
		}
	}

	_$router.start( _$App, '#app' )

}

_$utils.events.once( 'db.ready', function () {
	// console.warn( 'db.ready' )
	dbReady = true

	if ( deviceReady == false ) {
		return
	}
	start()
} )

var ready = function () {
	// console.warn( 'ready' )
	deviceReady = true

	if ( dbReady == false ) {
		return
	}
	start()
}

/*===================================
=            DEVICEREADY            =
===================================*/
document.addEventListener( "DOMContentLoaded", function () {

	// _$utils.events.emit( 'samsara.init' )

	if ( window.cordova ) {
		return
	}

	ready()

} )

document.addEventListener( "deviceready", ready )




















































//

