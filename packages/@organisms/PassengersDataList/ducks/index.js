import { createDuck, untouch } from '@libs/lash'

import passengersFormDuck from '@organisms/PassengersForm/ducks/index.js'

const passengersForms = passengersFormDuck.raiseDuckling((ditches) => {

	return {
		addFormToList: (state, { payload }) => {
			const { formKey, formCategory } = payload
			const formDitch = ditches.add(formKey)

			return {
				...state,
				[formKey]: {
					...formDitch.initialState,
					category: formCategory
				}
			}
		},
		removeFormFromList: (state, { payload: formKey }) => {
			ditches.remove(formKey)

			const newState = { ...state }
			delete newState[formKey]

			return newState
		}
	}
})

const initialState = {
	adults: 1,
	children: 0,
	infants: 0,
	canAddPassenger: true,
	canRemovePassenger: false,
	isConsistSelectorOpened: false,
}

export default createDuck({
	name: 'passengersDataList',
	initialState,
	ducklings: {
		passengersForms
	},
	isfwl: true,
	transformations: {
		setAdults: (state, { payload: count }) => {
			const paxCount = state.children + state.infants
			return {
				...state,
				adults: count,
				canRemovePassenger: paxCount + count > 1
			}
		},
		setChildren: (state, { payload: count }) => {
			const paxCount = state.adults + state.infants
			return {
				...state,
				children: count,
				canRemovePassenger: paxCount + count > 1
			}
		},
		setInfants: (state, { payload: count }) => {
			const paxCount = state.adults + state.children
			return {
				...state,
				infants: count,
				canRemovePassenger: paxCount + count > 1
			}
		},
		addAdults: (state, { payload: count }) => {
			const paxCount = state.adults + state.children + state.infants
			return {
				...state,
				adults: state.adults + count,
				canRemovePassenger: paxCount + count > 1
			}
		},
		addChildren: (state, { payload: count }) => {
			const paxCount = state.adults + state.children + state.infants
			return {
				...state,
				children: state.children + count,
				canRemovePassenger: paxCount + count > 1
			}
		},
		addInfants: (state, { payload: count }) => {
			const paxCount = state.adults + state.children + state.infants
			return {
				...state,
				infants: state.infants + count,
				canRemovePassenger: paxCount + count > 1
			}
		},
		removeAdult: (state) => {
			const paxCount = state.adults + state.children + state.infants
			return {
				...state,
				adults: state.adults - 1,
				canRemovePassenger: paxCount - 1 > 1
			}
		},
		removeChild: (state) => {
			const paxCount = state.adults + state.children + state.infants
			return {
				...state,
				children: state.children - 1,
				canRemovePassenger: paxCount - 1 > 1
			}
		},
		removeInfant: (state) => {
			const paxCount = state.adults + state.children + state.infants
			return {
				...state,
				infants: state.infants - 1,
				canRemovePassenger: paxCount - 1 > 1
			}
		},

		openConsistSelector: (state) => ({ ...state, isConsistSelectorOpened: true }),
		closeConsistSelector: (state) => ({ ...state, isConsistSelectorOpened: false }),

		setConsist: untouch,
	}
})
