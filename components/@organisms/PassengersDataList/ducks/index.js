import { createDuck, untouch } from '@libs/lash'
import { zipObject } from 'lodash'

import passengersFormDuck from '@organisms/PassengersForm/ducks/index.js'

const passengersForms = passengersFormDuck.raiseDuckling((ditches) => {

	return {
		updateFormsList: (state, { payload: formsKeys }) => {
			const getOrCreateForm = (key) => state[key] ? state[key] : ditches.add(key).initialState
			const formsValues = formsKeys.map(getOrCreateForm)
			const newState = zipObject(formsKeys, formsValues)
			ditches.update(newState)

			return newState
		},
	}
})

const initialState = {
	adults: 1,
	children: 0,
	infants: 0,
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
		setAdults: (state, { payload: count }) => ({ ...state, adults: count }),
		setChildren: (state, { payload: count }) => ({ ...state, children: count }),
		setInfants: (state, { payload: count }) => ({ ...state, infants: count }),
		openConsistSelector: (state) => ({ ...state, isConsistSelectorOpened: true }),
		closeConsistSelector: (state) => ({ ...state, isConsistSelectorOpened: false }),

		setConsist: untouch,
		confirmChangeConsist: untouch
	}
})
