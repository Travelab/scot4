export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setHolderValue: (state, { payload }) => ({
			...state,
			holder: {
				...state.holder,
				value: payload
			}
		}),
		setHolderTouched: (state, { payload }) => ({
			...state,
			holder: {
				...state.holder,
				isTouched: payload
			}
		}),
		setHolderValidation: (state, { payload }) => ({
			...state,
			holder: {
				...state.holder,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
