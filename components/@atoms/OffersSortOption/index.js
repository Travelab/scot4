import { createEnhancer } from '@utils/decoract'

import style from './styles/index'

const enhancer = createEnhancer({
	style: style(),
	withLang: false
})

const OffersSortOption = ({ $, ...props }) => {
	const { optionKey, title, isActive, onClick } = props

	const onClickHandler = () => onClick(optionKey)

	return (
		<div className={isActive ? $.activeOption : $.option} onClick={onClickHandler}>
			<span>{title}</span>
		</div>
	)
}

export default enhancer(OffersSortOption)
