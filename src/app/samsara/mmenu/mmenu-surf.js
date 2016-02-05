//

var _$utils = require( '../../utils.js' )
var Curves = require( '../Curves.js' )
// var Samsara = require( 'samsarajs' )
var Surface = Samsara.DOM.Surface
var ContainerSurface = Samsara.DOM.ContainerSurface
var Transform = Samsara.Core.Transform
var LayoutNode = Samsara.Core.LayoutNode
var View = Samsara.Core.View
var MouseInput = Samsara.Inputs.MouseInput
var TouchInput = Samsara.Inputs.TouchInput
var SequentialLayout = Samsara.Layouts.SequentialLayout
var Transitionable = Samsara.Core.Transitionable
var Accumulator = Samsara.Streams.Accumulator
var Timer = Samsara.Core.Timer



module.exports = View.extend( {

	defaults: {
		width: 100,
		height: 80
	},

	initialize: function ( opts ) {

		this.setSize( [ opts.width, opts.height ] )

		var temp = opts.theTemp

		var content = '<div class="list tabs side-tab tabs-icon-top"><li class="item tab-item"><i class="icon ' + temp.icon + '"></i>' + temp.text + '</li></div>'
		if ( temp.activeState == "help" ) {
			content = '<div class="list tabs side-tab tabs-icon-top help-me"><li class="item tab-item"><i class="icon ' + temp.icon + '"></i>' + temp.text + '</li></div>'
		}

		this.surf = new Surface( {
			content: content,
			size: [ opts.width, opts.height ]
		} )

		this.surf.scales = new Transitionable( 1 )
		this.scalesTrans = this.surf.scales.map( function ( value ) {
			return Transform.scale( [ value, 1 ] )
		} )

		this.surf.theTemp = temp
		this.surf.temp = opts.temp

		this.surf.on( 'touchstart', this.hrefPrep )

		this.add( {
			transform: this.scalesTrans
		} ).add( this.surf )

	},


	hrefPrep: function () {
		// console.log( 'this >', this )

		// if ( _$router._currentRoute.name == this.theTemp.state ) {
		// 	_$utils.events.emit( 'samsara.fixMenus' )
		// 	return
		// }

		// var curName = _$router._currentRoute.name.split( '.' )[ 0 ]
		// if ( curName == 'public' ) {
		// 	_$utils.events.emit( 'samsara.fixMenus' )
		// 	return
		// }

		// if ( this.theTemp.activeState == 'help' ) {
		// 	_$router.app.openSOS()
		// 	return
		// }

		// var iFrom = _.findIndex( this.temp, function ( v ) {
		// 	return v.state == curName
		// } )
		// console.log( 'iFrom >', iFrom )

		// var direct = 'left'
		// if ( iFrom > this.theTemp.index ) {
		// 	direct = 'down'
		// } else if ( iFrom < this.theTemp.index ) {
		// 	direct = 'up'
		// }

		this.scales.set( 1.25 )

		// _$router.go( {
		// 	name: this.theTemp.state,
		// 	query: {
		// 		direction: direct
		// 	}
		// } )

		Timer.after( function () {
			this.scales.set( 1 )
		}.bind( this ), 5 )

	}








} )






























































//

