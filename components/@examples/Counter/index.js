import { createEnhancer } from '@utils/decoract'

import duck from './ducks/index'

const enhancer = createEnhancer({ duck, withLang: false })

const Counter = ({ state, actions }) => {

	const { counter } = state
	const { increment, decrement } = actions

	return (
		<div>
			<button onClick={increment}>+</button>
			&nbsp;{counter}&nbsp;
			<button onClick={decrement}>-</button>
		</div>
	)
}

export default enhancer(Counter)

