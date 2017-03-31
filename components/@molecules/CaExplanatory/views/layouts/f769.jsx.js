import { createEnhancer } from '@utils/decoract'

import OrderNotReadyMsg from '../orderNotReadyMsg.jsx.js'
import WarningText from '../warningText.jsx.js'
import TicketsTypeExplanatory from '../ticketsTypeExplanatory.jsx.js'

import style from '../../styles/f769.js'

const enhancer = createEnhancer({ style })

const F769 = ({ $, l, ...props }) => {
	const {
		txtTech,
		txtTechHint,
		txtTickets,
		txtPayment,
		txtPrice,
		txtPriceHint,
		ticketsType,
		isOrderReady
	} = props

	const txtWarningAfterPayByTicketType = {
		regular: l('После оплаты авиабилеты будут выписаны и отправлены на вашу электронную почту.'),
		charter: l('После оплаты авиабилеты будут сразу забронированы, электронные авиабилеты вы получите за сутки до вылета рейса.'),
		hub: l('После оплаты авиабилеты будут выписаны и отправлены на вашу электронную почту.')
	}

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
				<div className={$.tech}>
					<div className={$.techText}>{txtTech}</div>
					<div className={$.techHint}>{txtTechHint}</div>
				</div>
				<div className={$.mainIdea}>
					<div>{txtTickets}</div>
					<div>{txtPayment}</div>
				</div>

				<div className={$.info}>
					<PricePlacement/>
					<WarningText>
						{txtWarningAfterPayByTicketType[ticketsType]}
					</WarningText>
					<TicketsTypeExplanatory type={ticketsType}/>
				</div>
			</div>
		</div>
	)
}

export default enhancer(F769)
