export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setEmailValue: (state, { payload }) => ({
			...state,
			email: {
				...state.email,
				value: payload
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
