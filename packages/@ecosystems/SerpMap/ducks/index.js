import { createDuck, createNestedReducer, initChildState } from '@libs/lash'
import travelabMapDuck from '@organisms/TravelabMap/ducks'

const travelabMap = travelabMapDuck.raiseDuckling()

const initialState = {
	height: null,
	isOpened: false,
	enableBoundsFilter: false,
	activeOfferId: null,
	pagesUpdatedAt: null
}

export default createDuck({
	name: 'serpMapState',
	initialState,
	isfwl: true,
	ducklings: {
		travelabMap
	},
	transformations: {
		// filter by bounds doesn't work on the backend
		open: (state) => ({ ...state, isOpened: true, enableBoundsFilter: false }),
		close: (state) => ({ ...state, isOpened: false, enableBoundsFilter: false }),
		resize: (state, { payload }) => ({ ...state, height: payload.height }),
		setActiveOffer: (state, { payload }) => ({ ...state, activeOfferId: payload }),
		updateDBStatus: (state, { payload }) => {
			const { reset, pagesUpdatedAt } = payload
			if (reset) {
				return {
					...state,
					pagesUpdatedAt,
					isOpened: false,
					activeOfferId: null,
					enableBoundsFilter: false
				}
			}
			else {
				return { ...state, pagesUpdatedAt }
			}
		},
	}
})
