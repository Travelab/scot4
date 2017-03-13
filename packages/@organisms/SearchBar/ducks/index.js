import { createDuck } from '@libs/lash'
import autocompleteDuck from '@molecules/Autocomplete/ducks'

const srcAutocomplete = autocompleteDuck.raiseDuckling()
const dstAutocomplete = autocompleteDuck.raiseDuckling()

const initialState = {
	selectedField: '',
	invalidFields: [],
	consist: {
		adults: 1,
		children: 0,
		infants: 0
	},
	outboundDate: null,
	inboundDate: null,
}

export default createDuck({
	name: 'travelersPackageInfo',
	initialState,
	ducklings: {
		srcAutocomplete,
		dstAutocomplete
	},
	transformations: {
		selectField: (state, { payload }) => ({ ...state, selectedField: payload }),

		setInvalidFields: (state, { payload }) => ({ ...state, invalidFields: payload }),

		selectAdults: (state, { payload }) => ({
			...state,
			consist: { ...state.consist, adults: payload }
		}),
		selectChildren: (state, { payload }) => ({
			...state,
			consist: { ...state.consist, children: payload }
		}),
		selectInfants: (state, { payload }) => ({
			...state,
			consist: { ...state.consist, infants: payload }
		}),

		setOutboundDate: (state, { payload }) => ({ ...state, outboundDate: payload }),
		setInboundDate: (state, { payload }) => ({ ...state, inboundDate: payload }),

		setFilter: (state) => state
	}
})

