//

/*===============================
=            GLOBALS            =
===============================*/

window.shimIndexedDB.__useShim()
window.shimIndexedDB.__debug( false )

const ENV_DEVELOPMENT = true
const ENV_PRODUCTION = false
const ENV_VERSION = '0.4.8'

// C_SOS = false
C_EMERGENCY = false

// g_IP = "http://192.168.1.125:1337"

location.hash = Lockr.get( 'location.hash' ) || '#!/public/about'

customURL = undefined
handleOpenURL = function ( url ) {
	customURL = url
}

// const C_DEFAULT_CONTACT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAEhElEQVR4Xu2agXETMRBFfyoAKgAqACqAVABUAKkAqACoAKgAqABSAVABUAFQAVABzEu8HlmRTrt3seKJpZnMxLZO2v37tftX9oH2fBzsuf8aAAwG7DkCF3kE7mbYf7mIWPQG4KqkJ5KeSuL/dPyR9FrSG0n832X0BOC2pE8Fx3NHf0p6KOlbDwR6AeB13nyGAYc9QOgFwFdJgBAZn1cgRJ4Jz+0BwGNJb8OWnT5wJOndzGddj/UA4KOk+y5rzk56LwkAtzZ6APBD0o2ZHpAI78x81vVYDwD+uSypT9qqjVtdfOUTGf3KTBB+LWCPa8seACzJAceSHrg8mTlpCQCca5KbKTrOKwbnA9X3aqZ9tSrAvlZWYRj7IqDCYy4AzyW9KOwGCKi43BheXw9aV6I/TlNSS5oCe14G95h1H8BGAFAbOEvmTvX8vZUMjtjHGqkchmlUlLyHSNcEgFJgqvtGGQDtMaI1SvWbek6z00qIf1fNUi6AeP2otbGkm5HjEAWgFX2zj+hfKxgLdQEhb4VtKi0xOaPUCP12NFKs82y1hwMrhY+ANwpsPgUuTCK7G50BjGoxlci8eiKkHqMMIHr0854RXbu1pheAUB7IjSQilCyrvUQFSllC8zY23x3dH8fB8gHnvtX/8/mtFkpZA9XyZ4OmTKZtzXV7rsc9Ja1Uv1mfJAa4VIXSoAUGdGic3wp5wM9LZ6kN36hSKQOmBEvqEJHD0Fo2L51BymbpGqwWUJwn4XI9lo6pHASLANaYNAXYOlGmAExJ1vxcwRIMTMsS6PNeWr6I+oeJiLcYDdAIq5QNOMY+qbACdN5Lk+hUxQJYArJxBKYemLqYgBFsnFMW57kDjN4E5aAQUa7HSusTiFrumGL0OqApA2yxnNpQi8+iN7VzrsFqjJhzPUYACEzJHwvamVrNGYLCRi+yOZTLUQYQxAzzLWlipGlxr2BqHYH08/QYklMskeIkeyOich2Bo/hj1YNjij/MPxm1Wm1O5QtaWSldU2GAAeKRyxHnmQsD6Q/M4ZKaRKcAVM7Wmj8hJTjViWGg5YmIWIqCYMlrKsPDVmxp6YoiA0CKzE4kQZENoUtNI6QOoP15ZskdYAsQok+zgz30BrWR1np8Qb3yDL5QMdbMTo8ACvCkNCTDOqtWD2DKD5aQ/LY5rE1uKUPTI6UOFpaiBdZHgEuG/FzbmfY4ZZuh8qj72xyURFOMret2CyDz85xBUI9gQO2ywtSS50xbht5G9s/BjOzVmnsIADUFaEiX0Fti1FJ2tJxK1zcW14J8DAC1NtMA8AiaiFE9AbBGrnol5wHA04fvKgCW5wYAtUvZwQBHDhhHwJG1Rg5YXUjsmg4YSXCldkcVGFXg9HruzBhlcJTB+pcU6GguOC6DDuAypHg77fn+7jIAUJUyAwCHytt7Bnh+csKlCX89lSDipvYlaxrXSfs9R8BBkvWUngBE7FqUAyIbDQAavyCLgFmbG/oFSGvDcQRaCAU/9yam4LIb0y3hLllj/ex5M+BcjOq5yACgJ9q7uNdgwC5GpadN/wFZJWF016jUawAAAABJRU5ErkJggg=="
const C_DEFAULT_CONTACT_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB10lEQVRYR+2X0TEEQRCG/4uADLgMiAARIAJE4ESACBABInAiQARkgAyIgPq2Zq7W1sx0z2C96Jetq5ue/vafnu7eieptVdKhpE1Ja8H9XtKTpAtJLzVbTmoWSzqWdFLweZN0JOnKu28NwKWkfefGQJx71noBCAxAjW1J4miK5gFYlvQsiWeNkQtTy8EDMJN0Zm2U+f/AygcPwFzSdiPAtZU3HoCPxuC4mcfw2wBAFGP8A3gU4BxXGvPgIZTsrLsHgLK61whwapTucoKEoDSdu0YAClGxOXkUIDYldaMSwpTfvCK9gLTdxwqA99CqzdbsVYDYNQ3JLMHxZWoA8NkJtX0po8ZrADW7YCsAfnRF1ACG6SiWXG4LfYOhxG0lBQjE9eN5G0Yu98YBjiaGP00pmQ85AJKOq9efAZhwmHQ8NvRHld3UgJICICgZH+XtB0RmEqxk1I2bxAADxPpQiRQAzpxvzpASNZiCSTp+UyMAx680N5KcjGoLGwJ8p+p5joY1HAXJ2tkQgNkvJb13c8+6L0NKH6Cm0HgCldYsClUfYIy3j1ALFSLAmG8fIbrvhgjAnScBx7TuRgBA0iH/X9gUgDGuXu7lOgUwvnj5Asp1uZ9Wh3mBqjr7BL+aUIGjxrGbAAAAAElFTkSuQmCC"

/*=====  HAMMER.JS  ======*/
const HM_DIRECTION_NONE = 1
const HM_DIRECTION_LEFT = 2
const HM_DIRECTION_RIGHT = 4
const HM_DIRECTION_UP = 8
const HM_DIRECTION_DOWN = 16
const HM_DIRECTION_HORIZONTAL = 6
const HM_DIRECTION_VERTICAL = 24
const HM_DIRECTION_ALL = 30

// document.addEventListener( 'DOMContentLoaded', function () {
// 	FastClick.attach( document.body )
// }, false )



if ( ENV_PRODUCTION ) {
	C_ERRORS = {}
	console.log = function () {}
	console.info = function () {}
	console.warn = function () {}
	console.error = function () {}
}


window.plugins = {}
window.plugins.nativepagetransitions = {}
window.plugins.nativepagetransitions.globalOptions = {}
window.plugins.nativepagetransitions.slide = function ( opts, callback ) {
	callback()
}
window.plugins.nativepagetransitions.executePendingTransition = function () {}









//

