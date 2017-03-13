import { createDuck } from '@libs/lash'
import counterDuck from '@examples/Counter/ducks'

const { nestedState: counter, nestedReducer: counterReducer } = counterDuck

const initialState = {
	text: 'initialText',
	...counter
}

export default createDuck({
	name: 'simpleNestedStore',
	initialState,
	composes: [
		counterReducer
	],
	transformations: {
		changeText: (state) => ({ ...state, text: 'changedText' })
	}
})

