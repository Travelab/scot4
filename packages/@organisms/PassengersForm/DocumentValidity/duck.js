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
		setDocValidityDay: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				dayValue: payload
			}
		}),
		setDocValidityMonth: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				monthValue: payload
			}
		}),
		setDocValidityYear: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				yearValue: payload
			}
		}),
		setDocValidityTouched: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				isTouched: payload
			}
		}),
		setDocValidityFocusedInput: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				focusedInput: payload
			}
		}),
		setDocValidityValidation: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
