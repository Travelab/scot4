import { createDuck, untouch } from '@libs/lash'
<% if (duckling) { %>
import SomeDuck from 'path/to/ducks/index.js'

const SomeDitch = SomeDuck.raiseDuckling()<% } %>

const initialState = {}

export default createDuck({
	name: '<%= componentNameCamel %>',
	initialState,<% if (duckling) { %>
	ducklings: {
		SomeDitch
	},<% } %><% if (isfwl) { %>
	isfwl: true,<% } %>
	transformations: {
		clickHandler: (state, action) => ({ ...state }),
		doNothing: untouch,
	}
})