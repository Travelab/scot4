import { get, last, mergeWith } from 'lodash'
import { saga, sagaEffects } from '@libs/lash'
import env from '@utils/env'
import qs from 'qs'

import orderTicketsInfo from '@organisms/OrderTicketsInfo/sagas'
import orderForm from '@organisms/OrderForm/sagas'
import Offer from '@libs/offer'
import { processCard, processPassenger } from '../helpers/processing.js'
import { redirectTo3ds } from '../helpers/pay.js'
import { OFFER_STATUS, REQ_CONSIST_STATUS } from '../ducks/index'

const { put, take, fork, call, select, cancel } = sagaEffects

let caCheckoutPageDitch, orderFormDitch
let offer, order

// function for check local storage (fucking Safari)
const isLocalStorageSupported = () => {
	const testKey = 'test'
	const storage = window.localStorage
	if (!storage) return false

	try {
		storage.setItem(testKey, '1')
		storage.removeItem(testKey)

		return true
	}
	catch (e) {
		return false
	}
}

function saveChannelToLS (channel) {
	window.localStorage.setItem('channel', channel)
	// expiration date is 1 month
	const curDate = new Date()
	const channelExpDate = curDate.setMonth(curDate.getMonth() + 1)
	window.localStorage.setItem('channelExpDate', channelExpDate)
}

/******************************************************************************/
/***************************** Subroutines ************************************/
/******************************************************************************/

function* loadOffer () {
	const { actions } = caCheckoutPageDitch

	let offerId
	const currentUrl = encodeURIComponent(window.location.href)
	const queryParams = qs.parse(window.location.search.replace(/^\?/, ''))
	let channel = queryParams.ref
	if (channel) {
		if (isLocalStorageSupported()) {
			saveChannelToLS(channel)
		}
	}
	else if (isLocalStorageSupported()) {
		const channelExpDate = window.localStorage['channelExpDate']
		if (channelExpDate > new Date()) {
			channel = window.localStorage['channel']
		}
	}

	let isChannelFromUrlOrLS = false
	if (channel) {
		isChannelFromUrlOrLS = true
		yield put(actions.setChannel(channel.split(':')[0]))
	}

	if (env.isDev) {
		offerId = 'MGNmNTcwZjQxMjNlMjUyZM2LCTqEiABoNMO1wLxXK3ywYQxdr8a9mx9o7Y_b-slol_k5LMQQzaa0vlCs8Dg9E4flUfCsTdpRXW3mbFbLRiINfIUyWiaoZb2xEgbH4LxnJu8subpr5oyuRPaCISkWjDUOkzYvdmv7QToNeTCvtWFp0UgXwLO-4teC6JPqv64MzvbkBYGowE7oDa2SA2Zo2SBxdsOC7jVWVCdZRt5P7UYGVJQ4uSnqO0ziIWqofFd1XuyM1_lxc5GYy4LdJKL5jrKW3XzcdYwEaIJl1VVAGjdq4mAfpSBDs0moXUSMjOBggwEX4xXUygaU7GiuqBkJg_c-4mFB7-ZaOUBvFZ5DDQ4IN-zJdu_UO87Zatp7FA6Va8bk2URXP3Hvw4WPqAscJqx1wufRcNxIW1YcKsQJZeQTtg8j3JV4XRYedpMp4RGA'
	}
	else {
		offerId = last(window.location.pathname.split('/'))
	}

	yield put(actions.setOfferStatus(OFFER_STATUS.LOADING))
	try {
		offer = yield Offer.fetch(offerId, currentUrl, channel)

		if (!channel) channel = offer.partner

		offer.setChannel(channel)
		if (!isChannelFromUrlOrLS) {
			if (isLocalStorageSupported()) {
				saveChannelToLS(channel)
			}
			yield put(actions.setChannel(channel))
		}

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
		// threeDSMode = true
	}
	else {
		const queryParams = qs.parse(window.location.search.replace(/^\?/, ''))
		if (queryParams && queryParams['order_id']) {
			orderId = queryParams['order_id']
			threeDSMode = true
		}
		else if (isLocalStorageSupported()) {
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

	if (isLocalStorageSupported() && !orderId && !env.isDev) {
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
			errors.push({ type: 'creditCard' })
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
				errors.push({ type: 'passengersDataList', index: i, formId: passengerDitch.name })
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

function* watchConsistChanges () {
	const { constants } = orderFormDitch.getDitch('passengersDataListDitch')
	const { actions } = caCheckoutPageDitch

	while (true) {
		const { payload: consist } = yield take(constants.confirmChangeConsist)

		const currentUrl = window.location.href
		yield put(actions.setRequestConsistStatus(REQ_CONSIST_STATUS.LOADING))
		try {
			const newOfferId = yield offer.requestChangeConsist(consist)
			offer = yield Offer.fetch(newOfferId, currentUrl)
			yield put(actions.setOffer({ offer }))
			yield put(orderFormDitch.getDitch('passengersDataListDitch').actions.setConsist(offer.consist))
			yield call(loadOrder, currentUrl)
			yield put(actions.setRequestConsistStatus(REQ_CONSIST_STATUS.SUCCESS))
		}
		catch (e) {
			console.log(e)
			yield put(orderFormDitch.getDitch('passengersDataListDitch').actions.setConsist(offer.consist))
			yield put(actions.setRequestConsistStatus(REQ_CONSIST_STATUS.FAILED))
		}
		
	}
}

function* watchLifecycle () {
	const { constants } = caCheckoutPageDitch

	while (true) {

		const action = yield take(constants.componentWillMount)

		yield call(loadOffer)

		const buyWatcher = yield fork(watchBuyClick)
		const consistChangesWatcher = yield fork(watchConsistChanges)

		yield take(constants.componentWillUnmount)

		yield cancel(buyWatcher)
		yield cancel(consistChangesWatcher)
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
