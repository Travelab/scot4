import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const CircleBtn = ({ $, ...props }) => {

	// Properties
	const { img, text, fontSize, background, color, onClick } = props

	const btnStyles = { fontSize, background, color }

	return (
		<div className={$.container} style={btnStyles} onClick={() => onClick()}>
			{ img && <img src={img.src} alt={img.alt}/> }
			<span>{text}</span>
		</div>
	)
}

export default enhancer(CircleBtn)

