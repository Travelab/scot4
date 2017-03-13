import { createDuck, untouch } from '@libs/lash'

import email from '../Email/duck.js'
import phone from '../Phone/duck.js'

const initialState = {
	email: email.initialState,
	phone: phone.initialState,
	isValid: false
}

export default createDuck({
	name: 'customerForm',
	initialState,
	transformations: {
		...email.transformations,
		...phone.transformations,

		setFormValidation: (state, { payload: isValid }) => ({
			...state,
			isValid
		})
	}
})
