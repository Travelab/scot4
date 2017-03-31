import { createDuck, untouch } from '@libs/lash'

import offersListDuck from '@organisms/OffersList/ducks'
import offersListHintDuck from '@molecules/OffersListHint/ducks'
import offersPaginateDuck from '@molecules/OffersPaginate/ducks'
import offersSortOptionsDuck from '@molecules/OffersSortOptions/ducks'

const offersList = offersListDuck.raiseDuckling()
const offersListHint = offersListHintDuck.raiseDuckling()
const offersPaginate = offersPaginateDuck.raiseDuckling()
const offersSortOptions = offersSortOptionsDuck.raiseDuckling()

const initialState = { }


export default createDuck({
	name: 'serpOffersViewer',
	initialState,
	isfwl: true,
	ducklings: {
		offersList,
		offersListHint,
		offersPaginate,
		offersSortOptions,
	},
	transformations: {
		setActiveOffer: untouch,
	}
})

