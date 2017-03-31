import { createDuck } from '@libs/lash'

const initialState = {
	isActive: false,
	pin: null,
	DBStatus: {
		inLoading: null,
		inCurrent: null,
	}
}

export default createDuck({
	name: 'secret',
	initialState,
	selector: (state) => ({ state }),
	transformations: {
		toggleShield: (state) => ({ ...state, isActive: !state.isActive }),
		applyPin: (state, { payload }) => ({ ...state, pin: payload.pin }),
		updateDBStatus: (state, { payload }) => ({ ...state, DBStatus: { ...payload.DBStatus } })
	}
}, { isfwl: true })