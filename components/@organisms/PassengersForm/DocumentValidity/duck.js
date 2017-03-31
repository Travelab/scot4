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
		setDocValidityDay: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				dayValue: payload,
				isEmpty: !payload.length || !state.documentValidity.monthValue.length || !state.documentValidity.yearValue.length
			}
		}),
		setDocValidityMonth: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				monthValue: payload,
				isEmpty: !payload.length || !state.documentValidity.dayValue.length || !state.documentValidity.yearValue.length
			}
		}),
		setDocValidityYear: (state, { payload }) => ({
			...state,
			documentValidity: {
				...state.documentValidity,
				yearValue: payload,
				isEmpty: !payload.length || !state.documentValidity.monthValue.length || !state.documentValidity.dayValue.length
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
