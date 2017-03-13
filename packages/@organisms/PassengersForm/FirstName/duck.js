export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setFirstNameValue: (state, { payload }) => ({
			...state,
			firstName: {
				...state.firstName,
				value: payload
			}
		}),
		setFirstNameTouched: (state, { payload }) => ({
			...state,
			firstName: {
				...state.firstName,
				isTouched: payload
			}
		}),
		setFirstNameValidation: (state, { payload }) => ({
			...state,
			firstName: {
				...state.firstName,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		}),
	}
}
