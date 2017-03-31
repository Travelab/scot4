import { createDuck } from '@libs/lash'
import counterDuck from '@examples/Counter/ducks'

const initialState = {
	countersCount: 0,
	counters: {}
}

export default createDuck({
	name: 'counterList',
	initialState,
	composes: [
		counterDuck.nestedReducer
	],
	transformations: {
		addCounter: (state) => {

			const counterState = counterDuck.initialReducedState
			const counterId = state.countersCount

			return {
				counters: { ...state.counters, [counterId]: counterState },
				countersCount: state.countersCount + 1
			}
		},
		removeCounter: (state) => ({
			counters: { ...state.counters, [state.countersCount - 1]: undefined },
			countersCount: state.countersCount - 1
		})
	}
})

