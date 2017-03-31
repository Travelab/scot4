export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},
	transformations: {
		setPhoneValue: (state, { payload }) => ({
			...state,
			phone: {
				...state.phone,
				value: payload,
				isEmpty: !payload.length
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
