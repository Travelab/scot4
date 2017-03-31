import { createEnhancer } from '@utils/decoract'
import { LocalProvider } from '@libs/lash'

import SimpleNestedStore from '@examples/SimpleNestedStore'
import simpleNestedStoreDuck from '@examples/SimpleNestedStore/ducks'

import duck from './ducks'

const enhancer = createEnhancer({ duck, withLang: false })

const DoubleNestedStore = ({ store, state, actions }) => {

	const { text } = state
	const { changeParentText } = actions

	return (
		<div>
			<div>Parent text from props: {text}</div>
			<button onClick={changeParentText}>Change parent text!</button>

			<div>
				Nested component with local store
				<LocalProvider store={store} branch={simpleNestedStoreDuck.branch}>
					<SimpleNestedStore/>
				</LocalProvider>
			</div>
		</div>
	)
}


export default enhancer(DoubleNestedStore)

