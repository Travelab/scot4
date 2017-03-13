export default {
	initialState: {
		value: 'male',
		isTouched: false,
		isValid: false,
		errorMsg: ''
	},
	transformations: {
		setGenderValue: (state, { payload }) => ({
			...state,
			gender: {
				...state.gender,
				value: payload
			}
		}),
		setGenderTouched: (state, { payload }) => ({
			...state,
			gender: {
				...state.gender,
				isTouched: payload
			}
		}),
		setGenderValidation: (state, { payload }) => ({
			...state,
			gender: {
				...state.gender,
				isValid: payload.isValid,
				errorMsg: payload.errorMsg
			}
		})
	}
}
