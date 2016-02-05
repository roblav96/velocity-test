//

var _$db = require( '../../../app/db.js' )
var _$http = require( '../../../app/http.js' )
var _$utils = require( '../../../app/utils.js' )

var _$samsara = require( '../../../app/samsara/samsara.js' )
	// console.log( '_$samsara >', _$samsara )
	// var mMenu = require( '../../../app/samsara.js' ).mMenu



module.exports = {
	template: require( './about-template.html' ),

	ready: function () {

		this.sMenu = [ {
			_text: "Back",
			_icon: "ion-arrow-left-c",
			_click: function () {
				console.warn( 'go back' )
			}.bind( this )
		}, {
			_text: "Boundaries",
			_icon: "ion-log-out",
			_click: function () {
				console.warn( 'boundaries' )
			}.bind( this )
		}, {
			_text: "Goto Map",
			_icon: "ion-android-expand",
			_href: true,
			_click: function () {
				console.warn( 'map' )
			}.bind( this )
		}, {
			_text: "Activities",
			_icon: "ion-ios-pulse-strong",
			_href: true,
			_click: function () {
				console.warn( 'Activities' )
			}.bind( this )
		}, {
			_text: "Submit",
			_icon: "ion-checkmark done",
			_click: function () {
				console.warn( 'Submit' )
			}.bind( this )
		}, {
			_text: "Submit",
			_icon: "ion-checkmark done",
			_click: function () {
				console.warn( 'Submit' )
			}.bind( this )
		}, {
			_text: "Submit",
			_icon: "ion-checkmark done",
			_click: function () {
				console.warn( 'Submit' )
			}.bind( this )
		}, {
			_text: "More Actions",
			_icon: "ion-android-more-vertical",
			_click: function () {
				console.warn( 'smenu' )
			}.bind( this )
		} ]

		// console.dir( _$mMenu )


		// console.info( 'about > _$db >', _$db )

		// _$db.save('yayy')

		// console.log( '_$db.temp >', JSON.stringify( _$db.temp, true, 4 ) )

		_$samsara.sBar.update( [ {
			_text: "Back",
			_icon: "ion-arrow-left-c",
			_color: 'assertive',
			_href: true,
			_click: function () {
				console.warn( 'go back' )
			}.bind( this )
		}, {
			_text: "Boundaries",
			_icon: "ion-log-out",
			_href: true,
			_click: function () {
				console.warn( 'boundaries' )
			}.bind( this )
		}, {
			_text: "Goto Map",
			_icon: "ion-android-expand",
			_href: true,
			_click: function () {
				console.warn( 'map' )
			}.bind( this ),
			_clickHold: function () {
				console.warn( 'map _clickHold' )
			}.bind( this )
		}, {
			_text: "Activities",
			_icon: "ion-ios-pulse-strong",
			_href: true,
			_click: function () {
				console.warn( 'Activities' )
			}.bind( this ),
			_clickHold: function () {
				console.warn( 'Activities _clickHold' )
			}.bind( this )
		}, {
			_text: "Submit",
			_icon: "ion-checkmark done",
			_click: function () {
				console.warn( 'Submit' )
			}.bind( this )
		}, {
			_text: "More Actions",
			_icon: "ion-android-more-vertical",
			_color: 'balanced',
			_click: function () {
				console.warn( 'smenu' )
			}.bind( this )
		} ] )


		// this.showTuts()



		this.$nextTick( function () {
			if ( !window.plugins ) {
				return
			}
			window.plugins.nativepagetransitions.executePendingTransition()
		} )

	},

	methods: {
		dev1: function () {
			// console.log( '_$samsara >', _$samsara )
			// console.log( 'mMenu >', mMenu )
			// _$samsara.mMenu.open()

			_$samsara.prog.start()
			return
			// _$samsara.mMenu.open()
			// _$utils.events.emit( 'samsara.mMenu.open' )

			var temp = [ {
				_text: "Back",
				_icon: "ion-arrow-left-c",
				_click: function () {
					console.warn( 'go back' )
				}.bind( this )
			}, {
				_text: "Boundaries",
				_icon: "ion-log-out",
				_click: function () {
					console.warn( 'boundaries' )
				}.bind( this )
			}, {
				_text: "Goto Map",
				_icon: "ion-android-expand",
				_href: true,
				_click: function () {
					console.warn( 'map' )
				}.bind( this )
			}, {
				_text: "Activities",
				_icon: "ion-ios-pulse-strong",
				_href: true,
				_click: function () {
					console.warn( 'Activities' )
				}.bind( this )
			}, {
				_text: "Submit",
				_icon: "ion-checkmark done",
				_click: function () {
					console.warn( 'Submit' )
				}.bind( this )
			}, {
				_text: "Submit",
				_icon: "ion-checkmark done",
				_click: function () {
					console.warn( 'Submit' )
				}.bind( this )
			}, {
				_text: "Submit",
				_icon: "ion-checkmark done",
				_click: function () {
					console.warn( 'Submit' )
				}.bind( this )
			}, {
				_text: "More Actions",
				_icon: "ion-android-more-vertical",
				_click: function () {
					console.warn( 'smenu' )
				}.bind( this )
			} ]

			var temp = _.sMenuPrep( this.sMenu )
			console.log( 'temp >', temp )
			_$samsara.sMenu.open( temp )
			






		},
		dev2: function () {
			_$samsara.prog.stop()
			// _$samsara.mMenu.close()
			// _$samsara.sMenu.close()
				// _$utils.events.emit( 'samsara.mMenu.close' )
		},

		dev3: function () {
			_$samsara.prog.error()
		},

		showTuts: function () {
			var html = require( './about-tuts.html' )
			_$samsara.tuts.open( html )
		},

		dev4: function () {
			var contacts = [ {
				"active": true,
				"boundaries": [],
				"convoying": true,
				"disabled": false,
				"dname": "Lindsay Heikkinen",
				"fav": false,
				"groups": [
					"Another group",
					"Ecrcvg",
					"Moar groyp",
					"Rcrvjk"
				],
				"id": "2e685657-13cd-4c36-a5df-2d6a443b75e2",
				"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB10lEQ…TuRgBA0iH/X9gUgDGuXu7lOgUwvnj5Asp1uZ9Wh3mBqjr7BL+aUIGjxrGbAAAAAElFTkSuQmCC",
				"uname": "lindsay",
				"xid": "rob"
			}, {
				"active": true,
				"boundaries": [],
				"convoying": false,
				"disabled": false,
				"dname": "Andre Rebelo",
				"fav": false,
				"groups": [],
				"id": "4a9ce4a5-159f-4a54-bf72-313cf727b839",
				"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB10lEQ…TuRgBA0iH/X9gUgDGuXu7lOgUwvnj5Asp1uZ9Wh3mBqjr7BL+aUIGjxrGbAAAAAElFTkSuQmCC",
				"uname": "rebelo396",
				"xid": "rob"
			}, {
				"active": true,
				"boundaries": [],
				"convoying": true,
				"disabled": false,
				"dname": "Robs Apple iPhone",
				"fav": true,
				"groups": [],
				"id": "4b7bd232-49b0-40e0-bf1b-131eea701350",
				"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR…Wr5wXoLPFolesreZ746RucuuUbvPaL50TXomFVwScl3xf+Hw8nfVNc9CSZAAAAAElFTkSuQmCC",
				"uname": "cel",
				"xid": "rob"
			}, {
				"active": true,
				"boundaries": [
					"5c44b9ba-d611-47c0-b010-a7a26bdf94e8"
				],
				"convoying": true,
				"disabled": false,
				"dname": "Marina",
				"fav": false,
				"groups": [],
				"id": "50987747-1353-4166-b7b2-55ab6e01cf4f",
				"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR…S/vZvtTzRwvG2Aidufo8c/kqkyPTa/SPRPv4B3SIRv8DL/DYlAP1lPgfxzAAAAAElFTkSuQmCC",
				"uname": "marinaalexis",
				"xid": "rob"
			}, {
				"active": true,
				"boundaries": [],
				"convoying": false,
				"disabled": false,
				"dname": "John",
				"fav": false,
				"groups": [],
				"id": "50c8fa1b-9c59-435c-8240-aa6ea5c2c1ff",
				"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB10lEQ…TuRgBA0iH/X9gUgDGuXu7lOgUwvnj5Asp1uZ9Wh3mBqjr7BL+aUIGjxrGbAAAAAElFTkSuQmCC",
				"uname": "john3",
				"xid": "rob"
			}, {
				"active": true,
				"boundaries": [],
				"convoying": true,
				"disabled": false,
				"dname": "benja",
				"fav": false,
				"groups": [
					"Another group",
					"Cttc",
					"Drctbn",
					"Ecrcvg",
					"Moar groyp",
					"Rcrvjk",
					"Rxrnumi",
					"Xrevnj"
				],
				"id": "e026db5b-2f58-4dc1-8fac-94c33e748278",
				"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAALC0lEQ…Dzz13S1pTRHYO74/gRvXfhCgH7Wtgb6d5Td+nMX97Q/wGjjqjH2yAQlgAAAABJRU5ErkJggg==",
				"uname": "ben",
				"xid": "rob"
			}, {
				"active": true,
				"boundaries": [
					"b2ed708e-84f8-48a5-a17d-50e53d27b67f"
				],
				"convoying": true,
				"disabled": false,
				"dname": "Android Tablet",
				"fav": true,
				"groups": [
					"Another group",
					"Rcrvjk",
					"Ecrcvg"
				],
				"id": "f7ac0dca-4f25-49c8-824b-d8bce2f9e345",
				"imgSrc": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAJa0lEQ…od8o9+hEkJM8Td8J61lpqPOLTpeBptvcPQrXsw9n6Vin8DAtP/zKFWGMUAAAAASUVORK5CYII=",
				"uname": "mom",
				"xid": "rob"
			} ]

			var boundaries = [ {
				"active": true,
				"geoPoint": null,
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.53292,
									41.64184
								],
								[ -71.53292,
									41.64184
								],
								[ -71.53292,
									41.64184
								],
								[ -71.53322,
									41.64198
								],
								[ -71.53391,
									41.64166
								],
								[ -71.53341,
									41.6422
								],
								[ -71.53348,
									41.64246
								],
								[ -71.53341,
									41.64272
								],
								[ -71.53322,
									41.64294
								],
								[ -71.53368,
									41.64349
								],
								[ -71.53292,
									41.64308
								],
								[ -71.53252,
									41.64394
								],
								[ -71.53258,
									41.64314
								],
								[ -71.53224,
									41.64308
								],
								[ -71.53142,
									41.64348
								],
								[ -71.53194,
									41.64294
								],
								[ -71.53175,
									41.64272
								],
								[ -71.53168,
									41.64246
								],
								[ -71.53175,
									41.6422
								],
								[ -71.53194,
									41.64198
								],
								[ -71.53185,
									41.64125
								],
								[ -71.53224,
									41.64184
								],
								[ -71.53258,
									41.64178
								],
								[ -71.53258,
									41.64178
								],
								[ -71.53292,
									41.64184
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"geoType": "polygon",
				"id": "1002366f-034c-4776-8fa1-e9c24a323d45",
				"name": "EG Home",
				"radius": null,
				"type": "homebase",
				"xid": "rob"
			}, {
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.16279,
									42.35217
								],
								[ -71.16278,
									42.35231
								],
								[ -71.16268,
									42.35231
								],
								[ -71.16268,
									42.35217
								],
								[ -71.16279,
									42.35217
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"id": "3e1b0802-f318-4629-a5a4-4da321edc47d",
				"name": "Dsf",
				"type": "boundary",
				"xid": "rob"
			}, {
				"active": true,
				"geoPoint": {
					"geometry": {
						"coordinates": [ -71.16276,
							42.35228
						],
						"type": "Point"
					},
					"properties": {},
					"type": "Feature"
				},
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.16286,
									42.35203
								],
								[ -71.16286,
									42.35236
								],
								[ -71.16263,
									42.35239
								],
								[ -71.16257,
									42.35205
								],
								[ -71.16286,
									42.35203
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"geoType": "circle",
				"id": "3f97d6b3-30a4-41df-a232-4f7e563f85e1",
				"name": "Bostonian",
				"radius": 60,
				"type": "homebase",
				"xid": "rob"
			}, {
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.533,
									41.64179
								],
								[ -71.53282,
									41.64256
								],
								[ -71.5323,
									41.6426
								],
								[ -71.53225,
									41.64185
								],
								[ -71.533,
									41.64179
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"id": "48c23a12-8221-43b2-b9fb-740c5d534e11",
				"name": "Eg boundary",
				"type": "boundary",
				"xid": "rob"
			}, {
				"geoPoint": null,
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.10115,
									42.34155
								],
								[ -71.10115,
									42.34155
								],
								[ -71.10115,
									42.34155
								],
								[ -71.10162,
									42.34187
								],
								[ -71.10191,
									42.34222
								],
								[ -71.10191,
									42.34251
								],
								[ -71.10169,
									42.3426
								],
								[ -71.10092,
									42.34274
								],
								[ -71.10057,
									42.34237
								],
								[ -71.10031,
									42.34183
								],
								[ -71.10115,
									42.34155
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"geoType": "polygon",
				"id": "5c44b9ba-d611-47c0-b010-a7a26bdf94e8",
				"name": "Marinas crib",
				"radius": null,
				"type": "boundary",
				"xid": "rob"
			}, {
				"active": false,
				"geoPoint": null,
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.16341,
									42.3518
								],
								[ -71.16341,
									42.3518
								],
								[ -71.16329,
									42.35277
								],
								[ -71.16251,
									42.35267
								],
								[ -71.1624,
									42.35175
								],
								[ -71.16341,
									42.3518
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"geoType": "polygon",
				"id": "6feeab00-d737-48d8-9c1e-9c93cca9e117",
				"name": "Another base",
				"radius": null,
				"type": "homebase",
				"xid": "rob"
			}, {
				"active": false,
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.16285,
									42.35199
								],
								[ -71.1632,
									42.35216
								],
								[ -71.1632,
									42.35216
								],
								[ -71.16295,
									42.3526
								],
								[ -71.16247,
									42.35261
								],
								[ -71.16232,
									42.35235
								],
								[ -71.16254,
									42.35197
								],
								[ -71.16285,
									42.35199
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"id": "b01c3a11-f058-4dde-9116-2e55587c9bd6",
				"name": "Homebase v2",
				"type": "homebase",
				"xid": "rob"
			}, {
				"geoPoint": {
					"geometry": {
						"coordinates": [ -71.16851,
							42.35091
						],
						"type": "Point"
					},
					"properties": {},
					"type": "Feature"
				},
				"geoPoly": {
					"geometry": {
						"coordinates": [
							[
								[ -71.16851,
									42.35001
								],
								[ -71.16897,
									42.35008
								],
								[ -71.16937,
									42.35027
								],
								[ -71.16963,
									42.35057
								],
								[ -71.16972,
									42.35091
								],
								[ -71.16963,
									42.35125
								],
								[ -71.16937,
									42.35155
								],
								[ -71.16897,
									42.35174
								],
								[ -71.16851,
									42.35181
								],
								[ -71.16805,
									42.35174
								],
								[ -71.16765,
									42.35155
								],
								[ -71.16739,
									42.35125
								],
								[ -71.1673,
									42.35091
								],
								[ -71.16739,
									42.35057
								],
								[ -71.16765,
									42.35027
								],
								[ -71.16805,
									42.35008
								],
								[ -71.16851,
									42.35001
								]
							]
						],
						"type": "Polygon"
					},
					"properties": {},
					"type": "Feature"
				},
				"geoType": "circle",
				"id": "b2ed708e-84f8-48a5-a17d-50e53d27b67f",
				"name": "Oak Sq Boundary",
				"radius": 100,
				"type": "boundary",
				"xid": "rob"
			} ]


			var activities = [ {
				"stamp": 1453144277491,
				"uname": "marinaalexis",
				"xid": "rob",
				"bool": false,
				"read": true,
				"uuid": "rob1453144277491",
				"title": "You removed Marina",
				"type": "actives"
			}, {
				"stamp": 1453144281929,
				"uname": "marinaalexis",
				"xid": "rob",
				"bool": true,
				"read": true,
				"uuid": "rob1453144281929",
				"title": "You added Marina",
				"type": "actives"
			}, {
				"pos": [ -71.1443,
					42.28215
				],
				"msg": "dvrbfb",
				"xid": "rob",
				"stamp": 1453145005069,
				"title": "\"dvrbfb\"",
				"type": "shout",
				"read": false,
				"uuid": "rob1453145005069"
			}, {
				"stamp": 1453229862331,
				"uname": "lindsay",
				"xid": "rob",
				"bool": false,
				"read": true,
				"uuid": "rob1453229862331",
				"title": "You removed Lindsay Heikkinen",
				"type": "actives"
			}, {
				"stamp": 1453229863938,
				"uname": "lindsay",
				"xid": "rob",
				"bool": true,
				"read": true,
				"uuid": "rob1453229863938",
				"title": "You added Lindsay Heikkinen",
				"type": "actives"
			} ]



			var geos = [ {
				"pos": [ -71.16291,
					42.35229
				],
				"acc": 20,
				"spd": 0,
				"xid": "rob",
				"stamp": 1453225864957,
				"uuid": "rob1453225864957",
				"battery": 100,
				"charging": true
			}, {
				"pos": [ -71.16291,
					42.35229
				],
				"acc": 20,
				"spd": 0,
				"xid": "rob",
				"stamp": 1453226198637,
				"uuid": "rob1453226198637",
				"battery": 100,
				"charging": true
			}, {
				"pos": [ -71.16289,
					42.35226
				],
				"acc": 65,
				"spd": -1,
				"xid": "rob",
				"stamp": 1453228406648,
				"uuid": "rob1453228406648",
				"battery": 88,
				"charging": true
			}, {
				"pos": [ -71.16303,
					42.35237
				],
				"acc": 100,
				"spd": -1,
				"xid": "rob",
				"stamp": 1453229379540,
				"uuid": "rob1453229379540",
				"battery": 91,
				"charging": true
			}, {
				"pos": [ -71.16318,
					42.35237
				],
				"acc": 65,
				"spd": -1,
				"xid": "rob",
				"stamp": 1453229817339,
				"uuid": "rob1453229817339",
				"battery": 93,
				"charging": true
			}, {
				"pos": [ -71.16281,
					42.35245
				],
				"acc": 206,
				"spd": -1,
				"xid": "rob",
				"stamp": 1453229831743,
				"uuid": "rob1453229831743",
				"battery": 100,
				"charging": false
			}, {
				"pos": [ -71.16291,
					42.35229
				],
				"acc": 20,
				"spd": 0,
				"xid": "rob",
				"stamp": 1453230247773,
				"uuid": "rob1453230247773",
				"battery": 100,
				"charging": true
			}, {
				"pos": [ -71.16291,
					42.35229
				],
				"acc": 20,
				"spd": 0,
				"xid": "rob",
				"stamp": 1453232110255,
				"uuid": "rob1453232110255",
				"battery": 100,
				"charging": true
			} ]

			_$db.putit( activities, contacts, boundaries, geos )
		}
	}

}

