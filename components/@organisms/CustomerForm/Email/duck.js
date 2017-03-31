export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},
	transformations: {
		setEmailValue: (state, { payload }) => ({
			...state,
			email: {
				...state.email,
				value: payload,
				isEmpty: !payload.length
			}
		}),
		setEmailTouched: (state, { payload }) => ({
			...state,
			email: {
				...state.email,
				isTouched: payload
			}
		}),
		setEmailValidation: (state, { payload }) => ({
			...state,
			email: {
				...state.email,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
