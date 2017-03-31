import CaRouteDescription from '@molecules/CaRouteDescription'
import CaExplanatory from '@molecules/CaExplanatory'
import OrderTicketsInfo from '@organisms/OrderTicketsInfo'
import OrderForm from '@organisms/OrderForm'

const MainContent = ({ meta, ...props }) => {

	const { $, f960, l, ditch } = meta
	const { offer, order, paymentProcessing, channel } = props
	const { orderTicketsInfoDitch, orderFormDitch } = ditch.getDitches()

	const propsOrderForm = {
		offer,
		order,
		paymentProcessing,
		ditch: orderFormDitch
	}

	const shadowedWrapClass = f960 ? $.shadowedWrap : $.t960NotShadowedWrap
	const isOrderReady = order !== null

	return (
		<div>
			<CaRouteDescription offer={offer} channel={channel}/>
			<div className={shadowedWrapClass}>
				<OrderTicketsInfo offer={offer} ditch={orderTicketsInfoDitch}/>
				<CaExplanatory offer={offer} isOrderReady={isOrderReady} showMotivation/>
				<OrderForm {...propsOrderForm}/>
			</div>
		</div>
	)
}

export default MainContent
