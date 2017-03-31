export default {
	initialState: {
		dayValue: '',
		monthValue: '',
		yearValue: '',
		focusedInput: '',
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},

	transformations: {
		setBirthDateDay: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				dayValue: payload,
				isEmpty: !payload.length || !state.birthDate.monthValue.length || !state.birthDate.yearValue.length
			}
		}),
		setBirthDateMonth: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				monthValue: payload,
				isEmpty: !payload.length || !state.birthDate.dayValue.length || !state.birthDate.yearValue.length
			}
		}),
		setBirthDateYear: (state, { payload }) => ({
			...state,
			birthDate: {
				...state.birthDate,
				yearValue: payload,
				isEmpty: !payload.length || !state.birthDate.monthValue.length || !state.birthDate.dayValue.length
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
