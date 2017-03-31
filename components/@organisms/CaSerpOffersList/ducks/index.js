import { createDuck } from '@libs/lash'

const initialState = {}

export default createDuck({
	name: 'caSerpOffersList',
	initialState,
	isfwl: true,
	transformations: {
		updateStatus: (state, { payload, meta }) => {
			const { pagesUpdatedAt, dbStatus } = payload

			return {
				...state,
				dbStatus,
				pagesUpdatedAt,
			}
		},
		clickHandler: (state, action) => ({ ...state }),
	}
})
