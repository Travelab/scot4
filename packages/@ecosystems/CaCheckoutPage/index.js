import { createEnhancer } from '@utils/decoract'
import { get, last } from 'lodash'

import CaHeader from '@molecules/CaHeader'
import CaRouteDescription from '@molecules/CaRouteDescription'
import OrderTicketsInfo from '@organisms/OrderTicketsInfo'
import OrderForm from '@organisms/OrderForm'
import CaExplanatory from '@molecules/CaExplanatory'
import CaFooter from '@atoms/CaFooter'
import OverlayWrapper from '@molecules/OverlayWrapper'

import Unavail from './Unavail.jsx.js'
import PaymentError from './PaymentError.jsx.js'
import PaymentPending from './PaymentPending.jsx.js'
import SuccessMsg from './SuccessMsg.jsx.js'
import LoadingMsg from './LoadingMsg.jsx.js'
import FailedMsg from './FailedMsg.jsx.js'

import duck, { OFFER_STATUS } from './ducks/index.js'
import style from './styles/index.js'

const cq = {
	f960: {
		minWidth: 960,
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	style,
	args: {},
})

const CaCheckoutPage = ({ $, cq, l, state, actions, ditch, args, ...props }) => {

	const { f960 } = cq

	const {
		offer,
		offerStatus,
		order,
		paymentProcessing,
		paymentResult,
		validationErrors
	} = state

	const { orderTicketsInfoDitch, orderFormDitch } = ditch.getDitches()

	const { updatePaymentResult } = actions

	const {  } = args

	let popUp = null

	if (order) {
		if (order.status === 'UNAVAIL') {
			popUp = (
				<OverlayWrapper>
					<Unavail f960={f960} />
				</OverlayWrapper>
			)
		}
		else if (order.status === 'PRICE_CHANGED') {
			popUp = (
				<OverlayWrapper>
					<Unavail f960={f960} />
				</OverlayWrapper>
			)
		}
	}

	let isPaymentSuccess = false

	if (paymentResult) {
		if (paymentResult.status === 'BOOKING' || paymentResult.status === 'BOOKED') {
			isPaymentSuccess = true
		}
		else if (paymentResult.status === '3DS') {
			popUp = (
				<OverlayWrapper>
					<PaymentPending />
				</OverlayWrapper>
			)
		}
		else if (/ERROR/.test(paymentResult.status)) {
			const tryAgainHandler = () => updatePaymentResult({ paymentResult: null })
			popUp = (
				<OverlayWrapper onClose={tryAgainHandler}>
					<PaymentError onOkClick={tryAgainHandler}/>
				</OverlayWrapper>
			)
		}
	}

	const isOrderReady = order !== null

	const renderF960MainContent = () => (
		<div>
			<CaRouteDescription offer={offer} />
			<div className={$.shadowedWrap}>
				<OrderTicketsInfo offer={offer} ditch={orderTicketsInfoDitch}/>
				<CaExplanatory offer={offer} isOrderReady={isOrderReady} showMotivation={true}/>
				<OrderForm offer={offer} order={order} paymentProcessing={paymentProcessing} ditch={orderFormDitch}/>
			</div>
		</div>
	)
	const renderT960MainContent = () => (
		<div>
			<CaRouteDescription offer={offer}/>
			<div className={$.t960NotShadowedWrap}>
				<OrderTicketsInfo offer={offer} ditch={orderTicketsInfoDitch}/>
				<CaExplanatory offer={offer} isOrderReady={isOrderReady} showMotivation={true}/>
				<OrderForm offer={offer} order={order} ditch={orderFormDitch}/>
			</div>
		</div>
	)

	const renderSuccessContent = () => (
		<div>
			<SuccessMsg orderNum={order.id} offer={offer} f960={f960} />
		</div>
	)
	const renderLoadingContent = () => (
		<div>
			<LoadingMsg />
		</div>
	)
	const renderFailedContent = () => (
		<div>
			<FailedMsg />
		</div>
	)

	let content = null
	const isOfferLoading = offerStatus === OFFER_STATUS.INIT
		|| offerStatus === OFFER_STATUS.LOADING
	const isFailed = offerStatus === OFFER_STATUS.FAILED
		|| order && order.status === 'INVALID'

	if (isOfferLoading) {
		content = renderLoadingContent()
	}
	else if (isPaymentSuccess) {
		content = (
			<div>
				<CaRouteDescription offer={offer} isSuccessMsg/>
				{renderSuccessContent()}
			</div>
		)
	}
	else if (isFailed) {
		content = renderFailedContent()
	}
	else {
		content = f960 ? renderF960MainContent() : renderT960MainContent()
	}

	const renderF960Layout = () => (
		<div className={$.container}>
			<div className={$.wrapper}>
				<div className={$.header}>
					<div className={$.wrap}>
						<CaHeader channel={offer && offer.channel}/>
					</div>
				</div>
				<div className={$.wrap}>
					{ content }
				</div>
				<div className={$.footer}>
					<CaFooter/>
				</div>
				{ popUp }
			</div>
		</div>
	)
	const renderT960Layout = () => (
		<div className={$.container}>
			<div className={$.t414Wrapper}>
				<div className={$.t960Header}>
					<div className={$.wrap}>
						<CaHeader channel={offer && offer.channel}/>
					</div>
				</div>
				<div className={$.wrap}>
					{ content }
				</div>
				{ popUp }
			</div>
		</div>
	)

	return f960 ? renderF960Layout() : renderT960Layout()
}

CaCheckoutPage.defaultProps = {
	offer: {},
	order: {}
}

export default enhancer(CaCheckoutPage)
