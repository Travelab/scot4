export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},
	transformations: {
		setFirstNameValue: (state, { payload }) => ({
			...state,
			firstName: {
				...state.firstName,
				value: payload,
				isEmpty: !payload.length
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
