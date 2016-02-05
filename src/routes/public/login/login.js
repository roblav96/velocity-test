//

var _$samsara = require( '../../../app/samsara/samsara.js' )



module.exports = {
	template: require( './login-template.html' ),

	data: function () {
		var data = {}
		data.uname = ""
		data.pass = ""
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

	methods: {

	}
}

