import { createDuck } from '@libs/lash'

const initialState = {
	running: false,
	time: 0
}

export default createDuck({
	name: 'stopwatch',
	initialState,
	selector: (state) => ({ state }),
	transformations: {
		start: (state) => ({ ...state, running: true }),
		tick: (state) => ({ ...state, time: state.time + 1 }),
		stop: (state) => ({ ...state, running: false }),
		reset: (state) => ({ ...state, time: 0 })
	}
})
