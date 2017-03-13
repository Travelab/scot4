import { createEnhancer } from '@utils/decoract'

import Counter from '@molecules/Counter'
import CaButton from '@atoms/CaButton'

import style from './styles/index.js'

const cq = {
	t414: {
		maxWidth: 414
	}
}

const enhancer = createEnhancer({
	cq,
	style,
})

const ConsistChanger = ({ $, cq, l, ...props }) => {

	// Component Query decomposition
	const { t414 } = cq

	// Properties
	const {
		adults,
		children,
		infants,
		onConfirm
	} = props

	// UI-text
	const txtTitle = l('Выберите количество пассажиров')
	const txtConfirm = l('Подтвердить')

	const propsAdultsSelector = {
		$, l,
		type: 'adults',
		...adults
	}
	const propsChildrenSelector = {
		$, l,
		type: 'children',
		...children
	}
	const propsInfantsSelector = {
		$, l,
		type: 'infants',
		...infants
	}

	const renderT414Layout = () => (
		<div className={$.t414Container}>
			<div className={$.title}>{txtTitle}</div>
			<div className={$.selectorWrapper}>
				<Selector { ...propsAdultsSelector} />
			</div>
			<div className={$.selectorWrapper}>
				<Selector { ...propsChildrenSelector} />
			</div>
			<div className={$.selectorWrapper}>
				<Selector { ...propsInfantsSelector} />
			</div>
			<div className={$.confirmBtn}>
				<CaButton title={txtConfirm} type='bigMobileGreen' onClick={onConfirm} />
			</div>
		</div>
	)

	const renderF414Layout = () => (
		<div className={$.container}></div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
}

const Selector = ({ $, l, ...props }) => {
	const {
		type,
		value,
		onIncrement,
		onDecrement
	} = props

	const txtTitle = {
		adults: { title: l('Взрослые'), age: l('12 лет и старше') },
		children: { title: l('Дети'), age: l('от 2 до 12 лет') },
		infants: { title: l('Младенцы'), age: l('до 2 лет') }
	}
	const valueEdges = {
		adults: { max: 5, min: 1 },
		children: { max: 4, min: 0 },
		infants: { max: 4, min: 0 }
	}

	const propsCounter = {
		height: 32,
		value,
		decrementIsDisabled: value === valueEdges[type].min,
		incrementIsDisabled: value === valueEdges[type].max,
		onIncrement,
		onDecrement,
	}

	return (
		<div className={$.selector}>
			<div className={$.selectorTitle}>
				{txtTitle[type].title}
				<span className={$.selectorTitleAge}>{txtTitle[type].age}</span>
			</div>
			<div className={$.counterWrapper}>
				<Counter { ...propsCounter } />
			</div>
		</div>
	)
}

export default enhancer(ConsistChanger)
