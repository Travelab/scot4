import { sortBy, values, filter, findKey } from 'lodash'
import citizenships from './citizenships.js'

export default {
	initialState: {
		inputValue: '',
		code: '',
		hoveredIdx: null,
		filteredCitizenships: values(citizenships),
		isActivated: false,
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},
	transformations: {
		activateCitizenship: (state) => ({
			...state,
			citizenship: {
				...state.citizenship,
				isActivated: true,
				isTouched: false
			}
		}),
		deactivateCitizenship: (state) => ({
			...state,
			citizenship: {
				...state.citizenship,
				isActivated: false,
				isTouched: true && !state.citizenship.isEmpty
			}
		}),
		setCitizenshipInputValue: (state, { payload }) => ({
			...state,
			citizenship: {
				...state.citizenship,
				inputValue: payload,
				code: findKey(citizenships, (value) => value === payload) || null,
				isEmpty: !payload.length
			}
		}),
		filterCitizenships: (state, { payload }) => ({
			...state,
			citizenship: {
				...state.citizenship,
				filteredCitizenships: filter(citizenships, (value) => {
					return value.toLowerCase().indexOf(payload.toLowerCase()) !== -1
				})
			}
		}),
		setCitizenshipHoveredIdx: (state, { payload }) => ({
			...state,
			citizenship: {
				...state.citizenship,
				hoveredIdx: payload
			}
		}),
		setCitizenshipValidation: (state, { payload }) => ({
			...state,
			citizenship: {
				...state.citizenship,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			},
		})
	}
}
