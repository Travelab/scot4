import { createEnhancer } from '@utils/decoract'

import CounterBtn from '@atoms/CounterBtn'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const Counter = ({ $, ...props }) => {

	// Properties
	const {
		height,
		value,
		decrementIsDisabled,
		incrementIsDisabled,
		onIncrement,
		onDecrement
	} = props

	const counterBtnStyle = { height, width: height }
	const valueStyle = { fontSize: height / 2 }

	return (
		<div className={$.container}>
			<div style={counterBtnStyle}>
				<CounterBtn minus isDisabled={decrementIsDisabled} onClick={onDecrement} />
			</div>
			<div className={$.value} style={valueStyle}>{value}</div>
			<div style={counterBtnStyle}>
				<CounterBtn plus isDisabled={incrementIsDisabled} onClick={onIncrement} />
			</div>
		</div>
	)
}

export default enhancer(Counter)
