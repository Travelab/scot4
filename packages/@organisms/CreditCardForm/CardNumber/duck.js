export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setCardNumberValue: (state, { payload }) => ({
			...state,
			cardNumber: {
				...state.cardNumber,
				value: payload
			}
		}),
		setCardNumberTouched: (state, { payload }) => ({
			...state,
			cardNumber: {
				...state.cardNumber,
				isTouched: payload
			}
		}),
		setCardNumberValidation: (state, { payload }) => ({
			...state,
			cardNumber: {
				...state.cardNumber,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
