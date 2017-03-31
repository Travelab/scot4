import { createDuck } from '@libs/lash'

const initialState = {
	counter: 0
}

export default createDuck({
	name: 'counter',
	initialState,
	transformations: {
		increment: (state) => ({ ...state, counter: state.counter + 1}),
		decrement: (state) => ({ ...state, counter: state.counter - 1})
	}
})

