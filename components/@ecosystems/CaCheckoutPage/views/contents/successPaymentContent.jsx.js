import CaRouteDescription from '@molecules/CaRouteDescription'
import SuccessPaymentMsg from './successPaymentMsg.jsx.js'

const SuccessPaymentContent = ({ meta, ...props }) => {

	const { f960 } = meta
	const { offer, order } = props

	const propsSuccessPaymentMg = {
		orderNum: order.id,
		offer,
		f960
	}

	return (
		<div>
			<CaRouteDescription offer={offer} isSuccessMsg/>
			<SuccessPaymentMsg {...propsSuccessPaymentMg}/>
		</div>
	)
}

export default SuccessPaymentContent
