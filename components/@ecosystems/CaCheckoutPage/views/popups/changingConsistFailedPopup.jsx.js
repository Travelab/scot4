import CaButton from '@atoms/CaButton'
import OverlayWrapper from '@molecules/OverlayWrapper'
import InfoMsg from '../infoMsg.jsx.js'

const ChangingConsistFailedPopUp = ({ meta, ...props }) => {

	const { $, l, f960 } = meta
	const { onChangingConsistFailedOkClick } = props

	const txtTitle = l('Авиабилеты не нашлись')
	const txtContent1 = l('Закончились посадочные места или перевозчик не может предоставить услугу.')
	const txtContent2 = l('Количество пассажиров осталось прежним.')

	const propsOkBtn = {
		title: l('Понятно'),
		type: 'green',
		onClick: onChangingConsistFailedOkClick
	}

	const okBtn = (
		<div className={$.changingConsistFailedOkBtnWrapper}>
			<CaButton {...propsOkBtn}/>
		</div>
	)
	const title = (
		<div className={$.changingConsistFailedTitleContainer}>
			{txtTitle}
		</div>
	)
	const contentErr = (
		<div className={$.changingConsistFailedContentContainer}>
			<div>{txtContent1}</div>
			<div>{txtContent2}</div>
		</div>
	)

	const propsInfoMsg = {
		title,
		content: contentErr,
		footer: okBtn,
		t959: !f960
	}

	return (
		<OverlayWrapper onClose={onChangingConsistFailedOkClick}>
			<div className={$.changingConsistFailedContainer}>
				<InfoMsg {...propsInfoMsg}/>
			</div>
		</OverlayWrapper>
	)
}

export default ChangingConsistFailedPopUp
