import { createEnhancer } from '@utils/decoract'

import PageView from './views/index.jsx.js'

import duck, { OFFER_STATUS, REQ_CONSIST_STATUS } from './ducks/index.js'

const enhancer = createEnhancer({ duck, withLang: false })

const CaCheckoutPage = ({ state, actions, ditch }) => {

	const {
		channel,
		offer,
		order,
		offerStatus,
		reqConsistStatus,
		paymentProcessing,
		paymentResult,
		validationErrors
	} = state
	const { updatePaymentResult, setRequestConsistStatus } = actions

	let popUpType = ''
	const isUnavail = order
		&& order.status === 'UNAVAIL' && order.status === 'PRICE_CHANGED'
	const isPayment3DS = paymentResult && paymentResult.status === '3DS'
	const isPaymentFailed = paymentResult && /(ERROR)|(INVALID)|(FAILED)|(REJECTED)/.test(paymentResult.status)
	const isReqConsistLoading = reqConsistStatus === REQ_CONSIST_STATUS.LOADING
	const isReqConsistFailed = reqConsistStatus === REQ_CONSIST_STATUS.FAILED
	if (isUnavail) popUpType = 'unavail'
	else if (isPayment3DS) popUpType = 'paymentPending'
	else if (isPaymentFailed) popUpType = 'paymentFailed'
	else if (isReqConsistLoading) popUpType = 'changingConsistPending'
	else if (isReqConsistFailed) popUpType = 'changingConsistFailed'

	let contentType = 'main'
	const isPaymentSuccess = paymentResult
		&& (paymentResult.status === 'BOOKING' || paymentResult.status === 'BOOKED')
	const isOfferLoading = offerStatus === OFFER_STATUS.INIT
		|| offerStatus === OFFER_STATUS.LOADING
	const isOfferFailed = offerStatus === OFFER_STATUS.FAILED
		|| (order && order.status === 'INVALID')
	if (isOfferLoading) contentType = 'loadingOffer'
	else if (isPaymentSuccess) contentType = 'successPayment'
	else if (isOfferFailed) contentType = 'failedOffer'

	const propsPageView = {
		ditch,
		contentType,
		popUpType,
		channel,
		offer,
		order,
		paymentProcessing,
		actions: {
			onPaymentFailedOkClick: () => updatePaymentResult({ paymentResult: null }),
			onChangingConsistFailedOkClick: () => setRequestConsistStatus(REQ_CONSIST_STATUS.INIT),
		}
	}

	return <PageView {...propsPageView}/>
}

export default enhancer(CaCheckoutPage)
