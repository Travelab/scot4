import { createDuck, untouch } from '@libs/lash'

import cardNumber from '../CardNumber/duck.js'
import holder from '../Holder/duck.js'
import expirationDate from '../ExpirationDate/duck.js'
import cvv from '../CVV/duck.js'

const initialState = {
	cardNumber: cardNumber.initialState,
	holder: holder.initialState,
	expirationDate: expirationDate.initialState,
	cvv: cvv.initialState,
	isValid: false
}

export default createDuck({
	name: 'creditCardForm',
	initialState,
	transformations: {
		...cardNumber.transformations,
		...holder.transformations,
		...expirationDate.transformations,
		...cvv.transformations,
		setFormValidation: (state, { payload: isValid }) => ({
			...state,
			isValid
		})
	}
})
