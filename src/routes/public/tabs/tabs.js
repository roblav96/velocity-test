//


module.exports = {
	template: require( './tabs-template.html' ),

	/*=============================
	=            ROUTE            =
	=============================*/
	route: {
		activate: function ( trans ) {
			trans.next()
		}
	}

	// methods: {
	// 	href: function ( toState, e ) {
	// 		var curState = _$router._currentRoute.name
	// 		if ( toState == curState ) {
	// 			return
	// 		}

	// 		var str = curState.toString()
	// 		var hrefState = toState.substr( 7, toState.length )
	// 		var curState = str.substr( 7, str.length )

	// 		var direction = {}
	// 		direction[ 'register' ] = {}
	// 		direction[ 'register' ][ 'about' ] = 'right'
	// 		direction[ 'register' ][ 'login' ] = 'right'
	// 		direction[ 'login' ] = {}
	// 		direction[ 'login' ][ 'about' ] = 'left'
	// 		direction[ 'login' ][ 'register' ] = 'left'
	// 		direction[ 'about' ] = {}
	// 		direction[ 'about' ][ 'login' ] = 'right'
	// 		direction[ 'about' ][ 'register' ] = 'left'

	// 		_$famous.href( toState, direction[ curState ][ hrefState ] )
	// 	}

	// 	// classObject: function ( isState ) {
	// 	// 	var curState = _$router._currentRoute.name
	// 	// 	console.log( 'curState >', curState )
	// 	// 	console.log( 'isState >', isState )
	// 	// 	return curState == isState
	// 	// }
	// },

	// data: function () {
	// 	var data = {}
	// 	data.classObject = {
	// 		'active': this.classObject()
	// 	}
	// 	return data
	// }


	// computed: {
	// 	classObject: function () {
	// 		console.info( 'idk' )
	// 		return {
	// 			'active': true
	// 		}
	// 	}
	// }

	// computed: {
	// 	activeClass: function ( isState ) {
	// 		var curState = _$router._currentRoute.name
	// 		console.log( 'isState >', isState )
	// 		return true
	// 	}
	// }
}

