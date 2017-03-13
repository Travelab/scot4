export default {
	initialState: {
		monthValue: '',
		yearValue: '',
		focusedInput: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},

	transformations: {
		setExpDateMonth: (state, { payload }) => ({
			...state,
			expirationDate: {
				...state.expirationDate,
				monthValue: payload
			}
		}),
		setExpDateYear: (state, { payload }) => ({
			...state,
			expirationDate: {
				...state.expirationDate,
				yearValue: payload
			}
		}),
		setExpDateTouched: (state, { payload }) => ({
			...state,
			expirationDate: {
				...state.expirationDate,
				isTouched: payload
			}
		}),
		setExpDateFocusedInput: (state, { payload }) => ({
			...state,
			expirationDate: {
				...state.expirationDate,
				focusedInput: payload
			}
		}),
		setExpDateValidation: (state, { payload }) => ({
			...state,
			expirationDate: {
				...state.expirationDate,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
