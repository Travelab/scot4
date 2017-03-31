import LoadingSpinner from '@atoms/LoadingSpinner'
import OverlayWrapper from '@molecules/OverlayWrapper'
import InfoMsg from '../infoMsg.jsx.js'

const PaymentPendingPopUp = ({ meta, ...props }) => {

	const { $, l, f960 } = meta

	const txtTitle = l('Ожидаем оплаты и оформляем билеты')
	const txtContent = l('Это может занять до одной минуты. Пожалуйста, не закрывайте окно браузера.')

	const loader = (
		<div className={$.paymentPendingSpinnerWrapper}>
			<LoadingSpinner clickaviaStyle/>
		</div>
	)
	const title = (
		<div className={$.paymentPendingTitleContainer}>
			{txtTitle}
		</div>
	)
	const contentPending = (
		<div className={$.paymentPendingContentContainer}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title,
		content: contentPending,
		footer: loader,
		t959: !f960
	}

	return (
		<OverlayWrapper>
			<div className={$.paymentPendingContainer}>
				<InfoMsg {...propsInfoMsg}/>
			</div>
		</OverlayWrapper>
	)
}

export default PaymentPendingPopUp
