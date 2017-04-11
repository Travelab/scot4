import { createEnhancer } from '@utils/decoract'
import { LocalProvider, connectDuck } from '@libs/lash'

import Counter from '@examples/Counter'
import counterDuck from '@examples/Counter/ducks'

import duck from './ducks/index'
import style from './style'

const enhancer = createEnhancer({ duck, style, withLang: false })

const CounterList = ({ $, store, state, actions }) => {

	const { countersCount } = state
	const { addCounter, removeCounter } = actions

	let counters = []
	for (let i = 0; i < countersCount; i++) {
		const counter = (
			<LocalProvider key={i} store={store} branch={counterDuck.dynamicBranch('counters', i)}>
				<Counter/>
			</LocalProvider>
		)
		counters.push(counter)
	}

	return (
		<div>
			<div>
				<button className={$.btn} onClick={addCounter}>AddCounter</button>
				<button onClick={removeCounter}>RemoveCounter</button>
				<h3 className={$.numOfCounters}>Numbers of counter: {countersCount}</h3>
			</div>
			<div className={$.counterField}>
				{counters}
			</div>
		</div>
	)
}

export default enhancer(CounterList)

