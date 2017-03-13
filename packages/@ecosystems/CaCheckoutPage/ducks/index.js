import { createDuck, untouch } from '@libs/lash'

import orderTicketsInfoDuck from '@organisms/OrderTicketsInfo/ducks/index.js'
import orderFormDuck from '@organisms/OrderForm/ducks/index.js'

const orderTicketsInfoDitch = orderTicketsInfoDuck.raiseDuckling()
const orderFormDitch = orderFormDuck.raiseDuckling()

export const OFFER_STATUS = {
	INIT: 'offer/INIT',
	LOADING: 'offer/LOADING',
	SUCCESS: 'offer/SUCCESS',
	FAILED: 'offer/FAILED'
}

const initialState = {
	offer: null,
	order: null,
	paymentProcessing: false,
	paymentResult: null,
	offerStatus: OFFER_STATUS.INIT
}

export default createDuck({
	name: 'caCheckoutPage',
	initialState,
	isfwl: true,
	ducklings: {
		orderTicketsInfoDitch,
		orderFormDitch,
	},
	transformations: {
		setOfferStatus: (state, { payload }) => ({ ...state, offerStatus: payload }),
		setOffer: (state, { payload }) => ({ ...state, offer: payload.offer }),
		setOrder: (state, { payload }) => ({ ...state, order: payload.order }),
		togglePaymentProcessing: (state) => ({ ...state, paymentProcessing: !state.paymentProcessing }),
		updatePaymentResult: (state, { payload }) => ({ ...state, paymentResult: payload.paymentResult }),
	}
})
