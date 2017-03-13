import { createDuck } from '@libs/lash'

import serpOfferDuck from '@organisms/SerpOffer/ducks'

const serpOffers = serpOfferDuck.raiseDuckling((ditches) => {

	return {
		updateOffers: (state, { payload }) => {

			const newState = {}
			const { offers } = payload

			let key
			let offerDitch

			offers.forEach((offer) => {

				key = offer.id
				offerDitch = ditches.get(key)
				if (!offerDitch) offerDitch = ditches.add(key)

				newState[key] = offerDitch.initialState
			})

			ditches.update(newState)

			return newState
		}
	}
})

const initialState = {
	dbStatus: null,
	activeOfferId: null,
	pagesUpdatedAt: null,
}

export default createDuck({
	name: 'offersList',
	initialState,
	ducklings: {
		serpOffers
	},
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

		setActiveOffer: (state, { payload }) => ({ ...state, activeOfferId: payload })
	}
})

