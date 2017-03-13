import { createDuck, untouch } from '@libs/lash'

const initialState = {
	agreeWithRules: true
}

export default createDuck({
	name: 'paymentDetails',
	initialState,
	transformations: {
		toggleCheckbox: (state) => ({ ...state, agreeWithRules: !state.agreeWithRules }),
		buy: untouch
	}
})

