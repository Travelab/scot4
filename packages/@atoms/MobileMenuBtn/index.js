import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

import menuIcon from './img/menuIcon.svg'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const MobileMenuBtn = ({ $, ...props }) => {

	// Properties
	const { onClick } = props

	return (
		<div className={$.container} onClick={() => onClick()}>
			<img src={menuIcon} alt='Menu' />
		</div>
	)
}

export default enhancer(MobileMenuBtn)
