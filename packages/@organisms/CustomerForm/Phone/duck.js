export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setPhoneValue: (state, { payload }) => ({
			...state,
			phone: {
				...state.phone,
				value: payload
			}
		}),
		setPhoneTouched: (state, { payload }) => ({
			...state,
			phone: {
				...state.phone,
				isTouched: payload
			}
		}),
		setPhoneValidation: (state, { payload }) => ({
			...state,
			phone: {
				...state.phone,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
