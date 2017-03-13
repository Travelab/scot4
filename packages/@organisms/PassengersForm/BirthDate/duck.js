export default {
	initialState: {
		dayValue: '',
		monthValue: '',
		yearValue: '',
		focusedInput: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},

	transformations: {
		setBirthDateDay: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				dayValue: payload
			}
		}),
		setBirthDateMonth: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				monthValue: payload
			}
		}),
		setBirthDateYear: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				yearValue: payload
			}
		}),
		setBirthDateTouched: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				isTouched: payload
			}
		}),
		setBirthDateFocusedInput: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				focusedInput: payload
			}
		}),
		setBirthDateValidation: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
