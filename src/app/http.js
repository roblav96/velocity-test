//

var moment = require( 'moment' )
var _$utils = require( './utils.js' )

/*==============================
=            _$HTTP            =
==============================*/
var _$http = {}
var self = {}





self.headers = function () {

	var heads = {}

	heads[ 'x-bytes' ] = forge.util.bytesToHex( forge.random.getBytesSync( 8 ) )

	// if ( _$scope.data.user.preKey ) {
	// 	heads[ 'x-pre-key' ] = _$scope.data.user.preKey + "." + _.now()
	// }

	// if ( _$scope.data.user.token && _$scope.data.user.xid ) {
	// 	heads[ 'x-id' ] = _$scope.data.user.xid
	// 	heads[ 'x-tok' ] = _$scope.data.user.token + "." + _.now()
	// }

	return heads
}



_$http.post = function ( url, data, callback ) {
	var sendi = {}
	_.forEach( data, function ( val, ind ) {
		sendi[ ind ] = JSON.stringify( val )
	} )
	window.cordovaHTTP.post( "http://192.168.1.125:1337/api" + url, sendi, self.headers(), function ( res ) {

		if ( res.status == 200 && res.data == "" ) {
			console.error( 'HTTP POST NULL' )
			return callback( null, null )
		}

		var data = {}
		try {
			data = JSON.parse( res.data )
		} catch ( err ) {
			console.error( "JSON PARSING ERROR" )
			return callback( err )
		}

		if ( data.err == true ) {
			if ( data.msg ) {
				window.plugins.toast.hide()
				window.plugins.toast.showShortCenter( data.msg )
			}
			return callback( data )
		} else {
			var stringified = JSON.stringify( data, true, 4 )
			var filter = [
				'/socket/update',
				'/public/login'
			]

			if ( _.includes( filter, url ) && stringified.length > 256 ) {
				stringified = stringified.substring( 0, 256 )
				console.log( '%c_$http.POST > ' + url + ' >', "color: blue; font-size: 9pt; font-weight: bold;", '\n\n' + stringified + '\n\n' )
				console.info( '%c< TRUNCATED', "color: orange; font-size: 9pt; font-weight: bold;" )
			} else {
				console.log( '%c_$http.POST > ' + url + ' >', "color: blue; font-size: 9pt; font-weight: bold;", '\n\n' + stringified + '\n\n' )
			}

			return callback( null, data )
		}

		// try {
		// 	var data = JSON.parse( res.data )
		// 	if ( data.err == true && data.msg ) {
		// 		window.plugins.toast.showLongCenter( data.msg )
		// 	}
		// 	return callback( null, data )
		// } catch ( err ) {
		// 	console.error( "JSON PARSING ERROR" )
		// 	return callback( err )
		// }
	}, function ( rej ) {
		console.error( 'HTTP POST REJECT > ', rej )

		if ( rej.status == 418 && ENV_PRODUCTION ) {
			window.plugins.toast.showLongCenter( 'New session detected.\nLogin credentials required!' )
			_$router.go( {
				name: 'public.login',
				query: {
					direction: 'up'
				}
			} )
		}

		return callback( rej )
	} )
}









document.addEventListener( 'deviceready', function () {

	// _$scope.data.user.uuid = forge.md.sha1.create().update( device.uuid ).digest().toHex()
	self.uuid = device.uuid

	window.cordovaHTTP.enableSSLPinning( false, function () {
		// console.log( 'success!' );
	}, function () {
		console.log( 'error :(' );
	} )

	window.cordovaHTTP.acceptAllCerts( true, function () {
		// console.log( 'success!' );
	}, function () {
		console.log( 'error :(' );
	} )

	window.cordovaHTTP.setHeader( "x-uuid", self.uuid, function ( msg ) {
		// console.log( 'msg >', msg )
	}, function ( msg ) {
		console.warn( msg )
	} )

	window.cordovaHTTP.setHeader( "Accepts", "application/json", function ( msg ) {
		// console.log( 'msg >', msg )
	}, function ( msg ) {
		console.warn( msg )
	} )

} )






if ( ENV_PRODUCTION ) {

	self.sendErrors = _.debounce( function () {
		// console.log( 'self.sendErrors > C_ERRORS >', JSON.stringify( C_ERRORS, true, 4 ) )

		var sendiErrors = _.cloneDeep( C_ERRORS )
		C_ERRORS = {}

		_$http.post( '/public/error', {
			errors: sendiErrors
		}, function ( err, response ) {} )

	}, 1000, {
		maxWait: 3000
	} )

	window.onerror = function ( msg, url, line, column, err ) {

		var deviceType = "N/A"
		var deviceModel = "N/A"
		var deviceVersion = "N/A"
		if ( device ) {
			if ( device.platform ) {
				deviceType = device.platform
			}
			if ( device.platform ) {
				deviceModel = device.model
			}
			if ( device.platform ) {
				deviceVersion = device.version
			}
		}

		var xid = Lockr.get( 'user.xid' ) || "N/A"
		var dname = Lockr.get( 'user.dname' ) || "N/A"
		var stamp = _.now()
		var trace = url + ":" + line
		var hash = forge.md.sha1.create().update( msg + trace ).digest().toHex()

		C_ERRORS[ hash ] = {
			message: msg,
			trace: trace,
			err: err,
			stamp: stamp,
			time: moment( stamp ).format( 'ddd, MMM D, hh:mm:ss A' ),
			appVersion: ENV_VERSION,
			deviceType: deviceType,
			deviceModel: deviceModel,
			deviceVersion: deviceVersion,
			xid: xid,
			dname: dname
		}

		self.sendErrors()

		// console.error( 'Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber + ' Column: ' + column + ' StackTrace: ' + errorObj )
	}

}















































module.exports = _$http

//

