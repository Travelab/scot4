import CaButton from '@atoms/CaButton'
import OverlayWrapper from '@molecules/OverlayWrapper'
import InfoMsg from '../infoMsg.jsx.js'

const PaymentFailedPopUp = ({ meta, ...props }) => {

	const { $, l, f960 } = meta
	const { onPaymentFailedOkClick } = props

	const txtTitle = l('Что-то пошло не так')
	const txtContent = l('Мы не смогли списать деньги за вашу покупку. Проверьте, все ли в порядке с вашей картой или воспользуйтесь другой картой.')

	const { onOkClick } = props

	const propsOkBtn = {
		title: l('Понятно, попробовать еще раз'),
		type: 'green',
		onClick: onPaymentFailedOkClick
	}

	const okBtn = (
		<div className={$.paymentFailedOkBtnWrapper}>
			<CaButton {...propsOkBtn}/>
		</div>
	)
	const title = (
		<div className={$.paymentFailedTitleContainer}>
			{txtTitle}
		</div>
	)
	const contentErr = (
		<div className={$.paymentFailedContentContainer}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title,
		content: contentErr,
		footer: okBtn,
		t959: !f960
	}


	return (
		<OverlayWrapper onClose={onOkClick}>
			<div className={$.paymentFailedContainer}>
				<InfoMsg {...propsInfoMsg}/>
			</div>
		</OverlayWrapper>
	)
}

export default PaymentFailedPopUp
