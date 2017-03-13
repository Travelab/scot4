import { createEnhancer } from '@utils/decoract'
import { range } from 'lodash'

import style from './style'

const enhancer = createEnhancer({ style })

const ConsistSelector = ({ $, l, ...props }) => {

	const {
		adultsValue,
		childrenValue,
		infantsValue,

		onAdultsValueClick,
		onChildrenValueClick,
		onInfantsValueClick
	} = props

	const renderValue = (selectedValue, onValueClick, value, i) => {

		const isSelected = selectedValue === value
		const valueClass = isSelected ? $.selectedValue : $.selectorValue
		const onClick = isSelected ? null : onValueClick.bind(null, value)

		return (
			<div
				key={i}
				className={valueClass}
				onClick={() => onClick()}
			>
				{value}
			</div>
		)
	}

	const adultSelectorValues = range(1, 6)
		.map(renderValue.bind(null, adultsValue, onAdultsValueClick))
	
	const childrenSelectorValues = range(0, 5)
		.map(renderValue.bind(null, childrenValue, onChildrenValueClick))
	
	const infantsSelectorValues = range(0, 5)
		.map(renderValue.bind(null, infantsValue, onInfantsValueClick))

	const txtAdultsTitle = l('Взрослые')
	const txtAdultsTitleAge = l('от 14 лет')
	const txtChildrenTitle = l('Дети')
	const txtChildrenTitleAge = l('2-13 лет')
	const txtInfantsTitle = l('Младенцы')
	const txtInfantsTitleAge = l('до 2 лет')

	return (
		<div className={$.selector}>
			<div className={$.selectorItem}>
				<div className={$.selectorItemTitle}>
					<div>{txtAdultsTitle}</div>
					<div className={$.selectorItemTitleAge}>{txtAdultsTitleAge}</div>
				</div>
				{adultSelectorValues}
			</div>

			<div className={$.selectorItem}>
				<div className={$.selectorItemTitle}>
					<div>{txtChildrenTitle}</div>
					<div className={$.selectorItemTitleAge}>{txtChildrenTitleAge}</div>
				</div>
				{childrenSelectorValues}
			</div>

			<div className={$.selectorItem}>
				<div className={$.selectorItemTitle}>
					<div>{txtInfantsTitle}</div>
					<div className={$.selectorItemTitleAge}>{txtInfantsTitleAge}</div>
				</div>
				{infantsSelectorValues}
			</div>
		</div>
	)
}

export default enhancer(ConsistSelector)

