import { createDuck } from '@libs/lash'

const initialState = {
	center: null,
	openedOfferId: null
}

export default createDuck({
	name: 'travelabMapState',
	initialState,
	transformations: {
		toggleOfferVisibility: (state, { payload }) => {

			const { id } = payload

			if (state.openedOfferId === id) {

				return { ...state, openedOfferId: null }
			} else {

				return { ...state, openedOfferId: id }
			}
		},
		setBounds: (state, { payload } ) => {

			const { center } = payload

			return {
				...state,
				center
			}
		},
		reset: (state) => ({ ...initialState })
	}
})
