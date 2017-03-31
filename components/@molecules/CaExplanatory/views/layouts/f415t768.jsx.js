import { createEnhancer } from '@utils/decoract'

import OrderNotReadyMsg from '../orderNotReadyMsg.jsx.js'

import style from '../../styles/f415t768.js'

const enhancer = createEnhancer({ style })

const F415t768 = ({ $, ...props }) => {
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

	return (
		<div className={$.container}>
			<div className={$.wrap}>
				<div className={$.row}>
					<div className={$.tech}>
						<div className={$.techText}>{txtTech}</div>
						<div className={$.techHint}>{txtTechHint}</div>
					</div>
					<div className={$.mainIdea}>
						<div>{txtTickets}</div>
						<div>{txtPayment}</div>
					</div>
				</div>

				<div className={$.info}>
					<PricePlacement/>
				</div>
			</div>
		</div>
	)
}

export default enhancer(F415t768)
