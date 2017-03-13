export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setCVVValue: (state, { payload }) => ({
			...state,
			cvv: {
				...state.cvv,
				value: payload
			}
		}),
		setCVVTouched: (state, { payload }) => ({
			...state,
			cvv: {
				...state.cvv,
				isTouched: payload
			}
		}),
		setCVVValidation: (state, { payload }) => ({
			...state,
			cvv: {
				...state.cvv,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
