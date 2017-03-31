import LoadingSpinner from '@atoms/LoadingSpinner'
import OverlayWrapper from '@molecules/OverlayWrapper'
import InfoMsg from '../infoMsg.jsx.js'

const ChangingConsistPendingPopUp = ({ meta, ...props }) => {

	const { $, l, f960 } = meta

	const txtTitle = l('Ищем билеты')
	const txtContent = l('Это может занять до одной минуты. Пожалуйста, не закрывайте окно браузера.')

	const loader = (
		<div className={$.changingConsistPendingSpinnerWrapper}>
			<LoadingSpinner clickaviaStyle/>
		</div>
	)
	const title = (
		<div className={$.changingConsistPendingTitleContainer}>
			{txtTitle}
		</div>
	)
	const contentPending = (
		<div className={$.changingConsistPendingContentContainer}>
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
			<div className={$.changingConsistPendingContainer}>
				<InfoMsg {...propsInfoMsg}/>
			</div>
		</OverlayWrapper>
	)
}

export default ChangingConsistPendingPopUp
