import { createEnhancer } from '@utils/decoract'

import LoadingSpinner from '@atoms/LoadingSpinner'
import InfoMsg from './InfoMsg.jsx.js'

import style from './styles/loadingMsg.js'

const enhancer = createEnhancer({
	style
})

const LoadingMsg = ({ $, l, ...props }) => {

	const txtTitle = l('Загружается информация о билете')
	const txtContent = l('Это может занять до одной минуты. Пожалуйста, не закрывайте окно браузера.')

	const loader = (
		<div className={$.loaderWrapper}>
			<LoadingSpinner clickaviaStyle />
		</div>
	)

	const contentLoading = (
		<div className={$.contentLoading}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title: txtTitle,
		content: contentLoading,
		footer: loader,
	}

	return (
		<div>
			<InfoMsg { ...propsInfoMsg } />
		</div>
	)
}

export default enhancer(LoadingMsg)
