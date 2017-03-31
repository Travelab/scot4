export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		isEmpty: true,
		errorMsg: ''
	},
	transformations: {
		setDocNumValue: (state, { payload }) => ({
			...state,
			documentNumber: {
				...state.documentNumber,
				value: payload,
				isEmpty: !payload.length
			}
		}),
		setDocNumTouched: (state, { payload }) => ({
			...state,
			documentNumber: {
				...state.documentNumber,
				isTouched: payload
			}
		}),
		setDocNumValidation: (state, { payload }) => ({
			...state,
			documentNumber: {
				...state.documentNumber,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
