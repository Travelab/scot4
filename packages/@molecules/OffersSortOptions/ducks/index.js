import { createDuck } from '@libs/lash'

const initialState = {
	activeSortKey: null
}

export default createDuck({
	name: 'offersSortOptions',
	initialState,
	transformations: {
		sort: (state, { payload }) => ({ ...state, activeSortKey: payload.key }),
	}
})