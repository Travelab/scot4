export default {
	initialState: {
		monthValue: '',
		yearValue: '',
		focusedInput: '',
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},

	transformations: {
		setExpDateMonth: (state, { payload }) => ({
			...state,
			expirationDate: {
				...state.expirationDate,
				monthValue: payload,
				isEmpty: !payload.length || !state.expirationDate.yearValue.length
			}
		}),
		setExpDateYear: (state, { payload }) => ({
			...state,
			expirationDate: {
				...state.expirationDate,
				yearValue: payload,
				isEmpty: !payload.length || !state.expirationDate.monthValue.length
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
