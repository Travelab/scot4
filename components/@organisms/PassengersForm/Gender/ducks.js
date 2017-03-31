export default {
	initialState: {
		value: '',
		isTouched: false,
		isValid: true,
		isEmpty: true,
		errorMsg: ''
	},
	transformations: {
		setGenderValue: (state, { payload }) => ({
			...state,
			gender: {
				...state.gender,
				value: payload,
				isEmpty: !payload.length
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
