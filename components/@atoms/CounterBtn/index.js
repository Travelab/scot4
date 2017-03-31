import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './styles/index.js'

const cx = makeCX()
const enhancer = createEnhancer({
	style,
	withLang: false,
})

const CounterBtn = ({ $, ...props }) => {

	// Properties
	const { plus, minus, isDisabled, onClick } = props

	const btnClass = cx({
		[$.counterBtn]: true,
		[$.minusBtn]: minus && !plus,
		[$.plusBtn]: plus,
		[$.disabledBtn]: isDisabled,
		[$.activeBtn]: !isDisabled,
	})

	return (
		<div className={btnClass} onClick={isDisabled ? null : onClick}/>
	)
}

export default enhancer(CounterBtn)
