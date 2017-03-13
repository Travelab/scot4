import { createDuck } from '@libs/lash'

const initialState = {
	isOpened: true
}

export default createDuck({
	name: 'offersListHint',
	initialState,
	transformations: {
		closeHint: (state) => ({ ...state, isOpened: false }),
	}
})

