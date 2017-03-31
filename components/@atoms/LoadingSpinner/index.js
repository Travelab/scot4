import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const LoadingSpinner = ({ $, ...props }) => {
	const { clickaviaStyle } = props

	const spinnerClass = clickaviaStyle ? $.clickaviaSpinner : $.spinner

	return (
		<div className={$.container}>
			<div className={spinnerClass} />
		</div>
	)
}

export default enhancer(LoadingSpinner)
