import { createEnhancer } from '@utils/decoract'

import style from '../styles/infoMsg.js'

const enhancer = createEnhancer({
	style,
	withLang: false
})

const InfoMsg = ({ $, ...props }) => {

	const { title, content, footer, t959 } = props

	const containerClass = t959 ? $.t959Container : $.container
	const titleClass = t959 ? $.t959Title : $.title

	return (
		<div className={containerClass}>
			<div className={titleClass}>{title}</div>
			<div className={$.content}>{content}</div>
			<div className={$.footer}>{footer}</div>
		</div>
	)
}

export default enhancer(InfoMsg)
