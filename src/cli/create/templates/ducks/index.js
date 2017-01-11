import { createDuck, untouch } from 'libs/lash'

const initialState = {}

export default createDuck({
	name: '<%= componentNameCamel %>',
	initialState,
	transformations: {
		clickHandler: (state, action) => ({ ...state }),
		doNothing: untouch,
	}
}<% if (isfwl) { %>, { isfwl: true }<% } %>)