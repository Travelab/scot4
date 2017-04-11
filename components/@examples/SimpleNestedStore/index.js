import { createEnhancer } from '@utils/decoract'
import { LocalProvider } from '@libs/lash'

import Counter from '@examples/Counter'
import counterDuck from '@examples/Counter/ducks'

import duck from './ducks/index'

const enhancer = createEnhancer({ duck, withLang: false })

const SimpleNestedStore = ({ store, state, actions }) => {

	const { text } = state
	const { changeText } = actions

	return (
		<div>
			<div>Text from props: {text}</div>
			<button onClick={changeText}>Change text!</button>

			<div>
				Nested component with local store
				<LocalProvider store={store} branch={counterDuck.branch}>
					<Counter/>
				</LocalProvider>
			</div>
		</div>
	)
}

export default enhancer(SimpleNestedStore)

