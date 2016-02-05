//

var _$samsara = require( '../../../app/samsara/samsara.js' )

module.exports = {
	template: require( './register-template.html' ),

	data: function () {
		var data = {}
		data.dname = ""
		// data.phone = "4018643464"
		data.uname = ""
		data.pass = ""
		
		// data.dname = "Robert Laverty"
		// data.uname = "roblav96"
		// data.pass = "abc123"
		return data
	},

	ready: function () {
		


		this.$nextTick( function () {
			if ( !window.plugins ) {
				return
			}
			window.plugins.nativepagetransitions.executePendingTransition()
		} )

	},

	// watch: {
	// 	'phone': function ( val, oldVal ) {
	// 		var phone1 = val.replace( /[^0-9]/g, '' ).substr( 0, 10 )
	// 		this.$nextTick( function () {
	// 			if ( phone1.length == 10 ) {
	// 				this.phone = _$utils.prettyPhoneNumber( phone1 )
	// 				return
	// 			}
	// 			this.phone = phone1
	// 		} )
	// 	}
	// },

	methods: {

		// formatPhone: function () {
		// 	// var str = _$utils.prettyPhoneNumber( this.phone )
		// 	// console.log( 'str >', str )
		// 	this.phone = this.phone.replace( /[^0-9]/g, '' )
		// },

		// getKey: function () {
		// 	_$pub.getInitKey()
		// }
	}
}









































































//

