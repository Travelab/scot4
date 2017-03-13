import { createDuck, untouch } from '@libs/lash'


const initialState = {}

export default createDuck({
	name: 'orderTicketsInfo',
	initialState,
	transformations: {
		clickHandler: (state, action) => ({ ...state }),
		// doNothing: untouch,
	}
})
