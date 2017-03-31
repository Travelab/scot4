import LoadingSpinner from '@atoms/LoadingSpinner'
import InfoMsg from '../infoMsg.jsx.js'

const LoadingOfferContent = ({ meta, ...props }) => {

	const { $, l, f960 } = meta

	const txtTitle = l('Загружается информация о билете')
	const txtContent = l('Это может занять до одной минуты. Пожалуйста, не закрывайте окно браузера.')

	const loader = (
		<div className={$.loadingContentSpinnerWrapper}>
			<LoadingSpinner clickaviaStyle/>
		</div>
	)

	const content = (
		<div className={$.loadingContentContainer}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title: txtTitle,
		content,
		footer: loader,
		t959: !f960
	}

	return <InfoMsg {...propsInfoMsg}/>
}

export default LoadingOfferContent
