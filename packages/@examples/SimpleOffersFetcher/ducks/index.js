import { createDuck } from '@libs/lash'

const initialState = {
	isActive: false,
	filter: null,
	DBStatus: {
		inLoading: null,
		inCurrent: null,
	}
}

export default createDuck({
	name: 'simple-offers-fetcher',
	initialState,
	transformations: {
		toggleShield: (state) => ({ ...state, isActive: !state.isActive }),
		applyFilter: (state, { payload }) => {
			return ({ ...state, filter: payload })
		},
		updateDBStatus: (state, { payload }) => ({ ...state, DBStatus: { ...payload.DBStatus } })
	}
}, { isfwl: true })
