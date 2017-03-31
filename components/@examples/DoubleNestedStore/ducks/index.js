import { createDuck } from '@libs/lash'
import simpleNestedStoreDuck from '@examples/SimpleNestedStore/ducks'

const { nestedState: simpleNestedStore, nestedReducer: simpleNestedStoreReducer } = simpleNestedStoreDuck

const initialState = {
	text: 'parentInitialText',
	...simpleNestedStore
}

export default createDuck({
	name: 'doubleNestedStore',
	initialState,
	composes: [
		simpleNestedStoreReducer
	],
	transformations: {
		changeParentText: (state) => ({...state, text: 'changedParentText'})
	}
})

