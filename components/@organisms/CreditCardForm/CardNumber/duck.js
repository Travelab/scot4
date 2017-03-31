export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},
	transformations: {
		setCardNumberValue: (state, { payload }) => ({
			...state,
			cardNumber: {
				...state.cardNumber,
				value: payload,
				isEmpty: !payload.length
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
