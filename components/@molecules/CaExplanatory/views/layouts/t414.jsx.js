import { createEnhancer } from '@utils/decoract'

import OrderNotReadyMsg from '../orderNotReadyMsg.jsx.js'

import style from '../../styles/t414.js'

const enhancer = createEnhancer({ style })

const T414 = ({ $, ...props }) => {
	const {
		txtTech,
		txtTechHint,
		txtTickets,
		txtPayment,
		txtPrice,
		txtPriceHint,
		isOrderReady
	} = props

	const Price = () => (
		<div className={$.price}>
			<div>{txtPrice}</div>
			<div className={$.priceHint}>{txtPriceHint}</div>
		</div>
	)

	const PricePlacement = isOrderReady ? Price : OrderNotReadyMsg
	const propsStyle = { $ }

	return (
		<div className={$.container}>
			<div className={$.wrap}>
				<div className={$.tech}>
					<div className={$.techText}>{txtTech}</div>
					<div className={$.techHint}>{txtTechHint}</div>
				</div>
				<div className={$.mainIdea}>
					<div>{txtTickets}</div>
					<div>{txtPayment}</div>
				</div>

				<div className={$.info}>
					<PricePlacement {...propsStyle}/>
				</div>
			</div>
		</div>
	)
}

export default enhancer(T414)
