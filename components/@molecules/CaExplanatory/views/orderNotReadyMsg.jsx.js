import { createEnhancer } from '@utils/decoract'

import LoadingSpinner from '@atoms/LoadingSpinner'

import style from '../styles/orderNotReadyMsg.js'

const enhancer = createEnhancer({ style })

const OrderNotReadyMsg = ({ $, l }) => {
	const txtOrderNotReady = l('Уточняем итоговую стоимость билетов')

	return (
		<div className={$.orderNotReadyMsg}>
			<span>{txtOrderNotReady}</span>
			<div className={$.loaderWrapper}>
				<LoadingSpinner clickaviaStyle/>
			</div>
		</div>
	)
}

export default enhancer(OrderNotReadyMsg)
