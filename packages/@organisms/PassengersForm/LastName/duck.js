export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setLastNameValue: (state, { payload }) => ({
			...state,
			lastName: {
				...state.lastName,
				value: payload
			}
		}),
		setLastNameTouched: (state, { payload }) => ({
			...state,
			lastName: {
				...state.lastName,
				isTouched: payload
			}
		}),
		setLastNameValidation: (state, { payload }) => ({
			...state,
			lastName: {
				...state.lastName,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
