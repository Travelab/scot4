import { createEnhancer } from '@utils/decoract'

import LoadingSpinner from '@atoms/LoadingSpinner'
import InfoMsg from './InfoMsg.jsx.js'

import style from './styles/paymentPending.js'

const enhancer = createEnhancer({
	style
})

const PaymentPending = ({ $, l, ...props }) => {

	const txtTitle = l('Ожидаем оплаты и оформляем билеты')
	const txtContent = l('Это может занять до одной минуты. Пожалуйста, не закрывайте окно браузера.')

	const loader = (
		<div className={$.loaderWrapper}>
			<LoadingSpinner clickaviaStyle />
		</div>
	)

	const contentPending = (
		<div className={$.contentPending}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title: txtTitle,
		content: contentPending,
		footer: loader,
	}

	return (
		<div className={$.container}>
			<InfoMsg { ...propsInfoMsg } />
		</div>
	)
}

export default enhancer(PaymentPending)
