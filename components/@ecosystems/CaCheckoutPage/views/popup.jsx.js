import UnavailPopUp from './popups/unavailPopup.jsx.js'
import PaymentFailedPopUp from './popups/paymentFailedPopup.jsx.js'
import PaymentPendingPopUp from './popups/paymentPendingPopup.jsx.js'
import ChangingConsistPendingPopUp from './popups/changingConsistPendingPopup.jsx.js'
import ChangingConsistFailedPopUp from './popups/changingConsistFailedPopup.jsx.js'

const popupByType = {
	unavail: UnavailPopUp,
	paymentPending: PaymentPendingPopUp,
	paymentFailed: PaymentFailedPopUp,
	changingConsistPending: ChangingConsistPendingPopUp,
	changingConsistFailed: ChangingConsistFailedPopUp,
}

const PopUp = ({ meta, ...props }) => {

	const { $ } = meta
	const { type, onChangingConsistFailedOkClick, onPaymentFailedOkClick } = props

	if (!type) return null

	const PopUpView = popupByType[type]

	const propsPopUpView = {
		meta,
		onChangingConsistFailedOkClick,
		onPaymentFailedOkClick
	}

	return (
		<div className={$.popupContainer}>
			<PopUpView {...propsPopUpView}/>
		</div>
	)
}

export default PopUp
