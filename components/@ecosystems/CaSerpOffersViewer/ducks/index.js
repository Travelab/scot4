import { createDuck } from '@libs/lash'

import caSerpOffersListDuck from '@organisms/CaSerpOffersList/ducks'
import offersPaginateDuck from '@molecules/OffersPaginate/ducks'
import offersSortOptionsDuck from '@molecules/OffersSortOptions/ducks'

const caSerpOffersList = caSerpOffersListDuck.raiseDuckling()
const offersPaginate = offersPaginateDuck.raiseDuckling()
const offersSortOptions = offersSortOptionsDuck.raiseDuckling()

const initialState = { }


export default createDuck({
	name: 'serpOffersViewer',
	initialState,
	isfwl: true,
	ducklings: {
		caSerpOffersList,
		offersPaginate,
		offersSortOptions,
	},
	transformations: {}
})

