import { createDuck, untouch } from '@libs/lash'

const initialState = {
	activeTab: 0,
}

export default createDuck({
	name: 'serpTabulator',
	initialState,
	isfwl: true,
	transformations: {
		setActiveTab: (state, { payload }) => ({ ...state, activeTab: payload }),
		doNothing: untouch,
	}
})