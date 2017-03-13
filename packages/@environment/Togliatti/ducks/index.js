import { redux } from '@libs/lash'
const { combineReducers } = redux

import serpPageDuck from '@ecosystems/SerpPage/ducks'

const createRootReducer = (reducers) => (state, action) => {
	if (action.branch) {
		const node = action.branch.pop()

		return {
			...state,
			[node]: reducers[node](state[node], action)
		}
	}
	else {
		return combineReducers(reducers)(state, action)
	}
}

export default createRootReducer({
	serpPage: serpPageDuck.reducer
})
