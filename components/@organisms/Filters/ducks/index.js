import { createDuck, untouch } from '@libs/lash'

const initialState = {
	// if need offers uncomment line below
	// dbUpdatedAt: '',
	selectedField: '',
	price: {
		from: null,
		to: null
	},
	rating: {
		from: null,
		to: null
	},
	distanceFromCenter: {
		from: null,
		to: null
	},
	stars: [ false, false, false, false, false ] // index of element = stars amount
}

export default createDuck({
	name: 'filters',
	initialState,
	/*isfwl: true,*/ // uncomment this if need offers
	transformations: {
		selectField: (state, { payload }) => ({ ...state, selectedField: payload }),

		setPriceFrom: (state, { payload }) => ({ ...state, price: { ...state.price, from: payload } }),
		setPriceTo: (state, { payload }) => ({ ...state, price: { ...state.price, to: payload } }),

		setRatingFrom: (state, { payload }) => ({ ...state, rating: { ...state.rating, from: payload} }),
		setRatingTo: (state, { payload }) => ({ ...state, rating: { ...state.rating, to: payload} }),

		setDistanceFrom: (state, { payload }) => ({
			...state,
			distanceFromCenter: { ...state.distanceFromCenter, from: payload}
		}),
		setDistanceTo: (state, { payload }) => ({
			...state,
			distanceFromCenter: { ...state.distanceFromCenter, to: payload}
		}),

		toggleStars: (state, { payload }) => ({
			...state,
			stars: state.stars.map((el, i) => i === payload ? !el : el)
		}),

		setFilter: (state) => state,

		setDbUpdatedAt: (state, { payload }) => ({ ...state, dbUpdatedAt: payload }),

		doNothing: untouch,
	}
})
