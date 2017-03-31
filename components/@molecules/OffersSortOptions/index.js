import { findIndex } from 'lodash'
import { createEnhancer } from '@utils/decoract'

import OffersSortOption from '@atoms/OffersSortOption'
import duck from './ducks'
import style from './styles'

const enhancer = createEnhancer({
	duck,
	style: style(),
	withLang: true
})

const OffersSortOptions = ({ l, $, state, actions }) => {
	const { activeSortKey } = state
	const { sort } = actions

	const asc = 'asc'
	const desc = 'desc'
	const sortOptions = [
		{ title: l('Сначала дешевые'), optionKey: 'priceAsc', optionVal: ['price', asc] },
		{ title: l('Сначала дорогие'), optionKey: 'priceDesc', optionVal: ['price', desc] },
		{ title: l('Сначала с высокой оценкой'), optionKey: 'ratingDesc', optionVal: ['rating', desc] },
		{ title: l('Сначала с низкой оценкой'), optionKey: 'ratingAsc', optionVal: ['rating', asc] },
	]

	const onChangeSort = (key) => {
		const idx = findIndex(sortOptions, (option) => (key == option.optionKey))
		sort({ key, option: sortOptions[idx].optionVal })
	}

	const content = sortOptions.map(
		(option) => {
			const propsOffersSortOption = {
				title: option.title,
				optionKey: option.optionKey,
				isActive: option.optionKey == activeSortKey,
				onClick: onChangeSort
			}

			return <OffersSortOption key={option.optionKey} {...propsOffersSortOption}/>
		}
	)

	const txtTitle = l('Сортировка')

	return (
		<div className={$.container}>
			<div className={$.title}>{txtTitle}:</div>
			{content}
		</div>
	)
}

export default enhancer(OffersSortOptions)
