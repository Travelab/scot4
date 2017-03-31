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
export const REQ_CONSIST_STATUS = {
	INIT: 'reqConsist/INIT',
	LOADING: 'reqConsist/LOADING',
	SUCCESS: 'reqConsist/SUCCESS',
	FAILED: 'reqConsist/FAILED'
}

const initialState = {
	offer: null,
	order: null,
	channel: '',
	paymentProcessing: false,
	paymentResult: null,
	offerStatus: OFFER_STATUS.INIT,
	reqConsistStatus: REQ_CONSIST_STATUS.INIT,
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
		setChannel: (state, { payload }) => ({ ...state, channel: payload }),
		setOfferStatus: (state, { payload }) => ({ ...state, offerStatus: payload }),
		setRequestConsistStatus: (state, { payload }) => ({ ...state, reqConsistStatus: payload }),
		setOffer: (state, { payload }) => ({ ...state, offer: payload.offer }),
		setOrder: (state, { payload }) => ({ ...state, order: payload.order }),
		togglePaymentProcessing: (state) => ({ ...state, paymentProcessing: !state.paymentProcessing }),
		updatePaymentResult: (state, { payload }) => ({ ...state, paymentResult: payload.paymentResult }),
	}
})
