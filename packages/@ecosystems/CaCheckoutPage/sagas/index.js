import { get, last } from 'lodash'
import { saga, sagaEffects } from '@libs/lash'
import env from '@utils/env'
import qs from 'qs'

import orderTicketsInfo from '@organisms/OrderTicketsInfo/sagas'
import orderForm from '@organisms/OrderForm/sagas'
import Offer from '@libs/offer'
import { processCard, processPassenger } from '../helpers/processing.js'
import { redirectTo3ds } from '../helpers/pay.js'
import { OFFER_STATUS } from '../ducks'

const { put, take, fork, call, select, cancel } = sagaEffects

let caCheckoutPageDitch, orderFormDitch
let offer, order

/******************************************************************************/
/***************************** Subroutines ************************************/
/******************************************************************************/

function* loadOffer () {
	const { actions } = caCheckoutPageDitch

	let offerId
	const currentUrl = window.location.href
	if (env.isDev) {
		offerId = 'MTVlODljMjNkOGZjNDg0N8FF1uWqG7nYt3x4hRUc6Y-9V3SYVpPa_v7zTMRRstouRy9-N5P9jhMNLWq9w7zUYAHgUI9EwHUboZvzexuICRXUPwQb8FhFBH3RxLU1XPHM5WCuZWsCwSwqW3GuZbiA2xcMFMYdDRkhHCD1LwSRWh32COCI29cpm7iTNHVTQNmaHP_E9om4UfMYRThTSPTqpNA3IL9dLzKUFzJW-vFyQqiEx1UM8KE9WkM4Jd4inhOUUhxR6uBJFdgWsmpnH9eMygFmQdBwOSMXG5z_FMDenTY1A7nVtxAO9gZ5wOdlVeXvfE6FpDICVcpoTPHDDgHrzuO0PCRr_rX8UeJbXxZEU6e28xLld4m73qlR9_8G1Ep6UsJRjXzRwW2o6rYSUyYkFl30yFec5l_bCN_qeDAtl5jr4B56J6kx07-oHZvSga8Gt8Rex25z9HGcU6Di6KYxtM4FvJF2xZmTYF_0ya-J3YDyEY1NEEUaZOZL2b5R3WTI'
	}
	else {
		offerId = last(window.location.pathname.split('/'))
	}

	yield put(actions.setOfferStatus(OFFER_STATUS.LOADING))
	try {
		offer = yield Offer.fetch(offerId, currentUrl)

		yield put(actions.setOffer({ offer }))
		yield put(actions.setOfferStatus(OFFER_STATUS.SUCCESS))
		yield put(orderFormDitch.getDitch('passengersDataListDitch').actions.setConsist(offer.consist))

		yield call(loadOrder, currentUrl)
	}
	catch (e) {
		console.log(e) // TODO: handle errors
		yield put(actions.setOfferStatus(OFFER_STATUS.FAILED))
	}
}

function* loadOrder(currentUrl) {
	const { actions } = caCheckoutPageDitch
	let orderId
	let threeDSMode = false
	if (env.isDev) {
		orderId = '58abbb65d5c619042b3b01b1'
		// threeDSMode = true
	}
	else {
		const queryParams = qs.parse(window.location.search.replace(/^\?/, ''))
		if (queryParams && queryParams['order_id']) {
			orderId = queryParams['order_id']
			threeDSMode = true
		}
		else if (window.localStorage) {
			orderId = window.localStorage[offer.id]
		}
	}

	if (threeDSMode) {
		order = yield offer.getOrder({ orderId })
		
		yield put(actions.setOrder({ order }))
		yield put(actions.updatePaymentResult({ paymentResult: { status: '3DS' } }))

		const check3ds = yield order.confirm()
		yield put(actions.updatePaymentResult({ paymentResult: check3ds.body }))
	}
	else {
		order = yield offer.getOrder({ orderId, currentUrl })

		yield put(actions.setOrder({ order }))
	}

	if (window.localStorage && !orderId && !env.isDev) {
		window.localStorage.setItem(offer.id, order.id)
	}
}

function* buy () {
	if (order) {
		const { actions } = caCheckoutPageDitch

		yield put(actions.togglePaymentProcessing())

		const data = {
			channel: offer.channel,
			personal_data: []
		}
		const errors = []

		const creditCardDitch = orderFormDitch.getDitch('creditCardDitch')
		const creditCardSelector = creditCardDitch.selector.bind(creditCardDitch)
		const creditCard = yield select((state) => creditCardSelector(state))
		if (creditCard.isValid) {
			data['card_data'] = processCard(creditCard)
		}
		else {
			errors.push({ type: 'card' })
		}

		const customerFormDitch = orderFormDitch.getDitch('customerFormDitch')
		const customerFormSelector = customerFormDitch.selector.bind(customerFormDitch)
		const customerForm = yield select((state) => customerFormSelector(state))
		if (customerForm.email.value && customerForm.phone.value) {
			data['email'] = customerForm.email.value
			data['phone'] = customerForm.phone.value
		}
		else {
			errors.push({ type: 'customerForm' })
		}

		const passengersDitches = Object.values(
			orderFormDitch.getDitch('passengersDataListDitch').getDitch('passengersForms').getDitches()
		)
		for (let i = 0; i < passengersDitches.length; i++) {
			const passengerDitch = passengersDitches[i]

			const passSelector = passengerDitch.selector.bind(passengerDitch)
			const passForm = yield select((state) => passSelector(state))

			if (passForm.isValid) {
				const pass = processPassenger(passForm)

				data['personal_data'].push(pass)
			}
			else {
				errors.push({ type: 'passenger', index: i })
			}
		}

		if (errors.length > 0) {
			yield put(orderFormDitch.actions.setValidationErrors({ validationErrors: errors }))
			yield put(actions.togglePaymentProcessing())
			yield put(actions.updatePaymentResult({ paymentResult: null }))
		}
		else {
			yield put(orderFormDitch.actions.setValidationErrors({ validationErrors: null }))
			const res = yield order.book(data)

			if (res && get(res, 'body.status') === 'PAYMENT_3DS_REQUIRED') {
				redirectTo3ds(document, res)
			}
			else {
				yield put(actions.togglePaymentProcessing())
				yield put(actions.updatePaymentResult({ paymentResult: res.body }))
			}
		}
	}
}


/******************************************************************************/
/***************************** Watchers ***************************************/
/******************************************************************************/
function* watchBuyClick () {

	const { constants } = orderFormDitch

	while (true) {

		yield take(constants.buy)

		yield call(buy)
	}
}

function* watchLifecycle () {
	const { constants } = caCheckoutPageDitch

	while (true) {

		const action = yield take(constants.componentWillMount)

		yield call(loadOffer)

		const buyWatcher = yield fork(watchBuyClick)

		yield take(constants.componentWillUnmount)

		cancel(buyWatcher)
	}
}


export default function* (ditch) {
	caCheckoutPageDitch = ditch
	orderFormDitch = ditch.getDitch('orderFormDitch')
	const orderTicketsInfoDitch = ditch.getDitch('orderTicketsInfoDitch')

	yield [
		fork(watchLifecycle),
		fork(orderTicketsInfo, orderTicketsInfoDitch),
		fork(orderForm, orderFormDitch),
	]
}
