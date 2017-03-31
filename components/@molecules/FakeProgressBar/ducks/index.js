import { createDuck } from '@libs/lash'

const initialState = {
	percent: 0
}

export default createDuck({
	name: 'fakeProgressBar',
	initialState,
	isfwl: true,
	transformations: {
		start: (state) => state,
		stop: (state) => state,
		setPercent: (state, { payload }) => ({ ...state, percent: payload })
	}
})
