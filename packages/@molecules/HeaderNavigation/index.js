import { createEnhancer } from '@utils/decoract'

import style from './style'

const enhancer = createEnhancer({ style })

const HeaderNavigation = ({ $, l, ...props }) => {

	const { isVertical } = props

	// UI-text
	const txtWhyWe = l('Почему нужно покупать у нас')
	const txtAboutUs = l('О компании')
	const txtPartners = l('Наши партнеры')

	const containerClass = isVertical ? $.mobileContainer : $.container

	return (
		<div className={containerClass}>
			<a href='#'>{ txtWhyWe }</a>
			<a href='#'>{ txtAboutUs }</a>
			<a href='#'>{ txtPartners }</a>
		</div>
	)
}

export default enhancer(HeaderNavigation)

