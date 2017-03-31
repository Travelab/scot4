import { createDuck, untouch } from '@libs/lash'

const initialState = {
	dbUpdatedAt: null,
	pagesUpdatedAt: null,
	isOpened: false
}

export default createDuck({
	name: 'offersPaginate',
	initialState,
	isfwl: true,
	transformations: {
		changePage: untouch,
		toggleBalloon: (state) => ({ ...state, isOpened: !state.isOpened }),
		hideBalloon: (state) => ({ ...state, isOpened: false }),
		updateDBStatus: (state, { payload: { dbUpdatedAt, pagesUpdatedAt } }) => (
			{ ...state, dbUpdatedAt, pagesUpdatedAt }
		)
	}
})

