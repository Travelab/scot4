import { createEnhancer } from '@utils/decoract'

import style from './styles/infoMsg.js'

const enhancer = createEnhancer({
	style,
	withLang: false
})

const InfoMsg = ({ $, ...props }) => {

	const { title, content, footer } = props

	return (
		<div className={$.container}>
			<div className={$.title}>{title}</div>
			<div className={$.content}>{content}</div>
			<div className={$.footer}>{footer}</div>
		</div>
	)
}

export default enhancer(InfoMsg)
