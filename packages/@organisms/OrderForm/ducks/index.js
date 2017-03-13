import { createDuck, untouch } from '@libs/lash'

import paymentDetailsDuck from '@molecules/PaymentDetails/ducks/index.js'
import creditCardDuck from '@organisms/CreditCardForm/ducks/index.js'
import customerFormDuck from '@organisms/CustomerForm/ducks/index.js'
import passengersDataListDuck from '@organisms/PassengersDataList/ducks/index.js'

const paymentDetailsDitch = paymentDetailsDuck.raiseDuckling()
const creditCardDitch = creditCardDuck.raiseDuckling()
const customerFormDitch = customerFormDuck.raiseDuckling()
const passengersDataListDitch = passengersDataListDuck.raiseDuckling()

const initialState = {
	validationErrors: null
}

export default createDuck({
	name: 'orderForm',
	initialState,
	ducklings: {
		paymentDetailsDitch,
		creditCardDitch,
		customerFormDitch,
		passengersDataListDitch
	},
	transformations: {
		setValidationErrors: (state, { payload }) => ({
			...state,
			validationErrors: payload.validationErrors
		}),
		buy: untouch,
	}
})
