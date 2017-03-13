import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'
import InfoMsg from './InfoMsg.jsx.js'

import style from './styles/paymentError.js'

const enhancer = createEnhancer({
	style
})

const PaymentError = ({ $, l, ...props }) => {

	const txtTitle = l('Что-то пошло не так')
	const txtContent = l('Мы не смогли списать деньги за вашу покупку. Проверьте, все ли в порядке с вашей картой или воспользуйтесь другой картой.')

	const { onOkClick } = props

	const propsOkBtn = {
		title: l('Понятно, попробовать еще раз'),
		type: 'green',
		onClick: onOkClick
	}

	const okBtn = (
		<div className={$.okBtnWrapper}>
			<CaButton { ...propsOkBtn } />
		</div>
	)

	const contentErr = (
		<div className={$.contentErr}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title: txtTitle,
		content: contentErr,
		footer: okBtn,
	}

	return (
		<div className={$.container}>
			<InfoMsg { ...propsInfoMsg } />
		</div>
	)
}

export default enhancer(PaymentError)
