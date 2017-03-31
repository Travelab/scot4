import { saga, sagaEffects } from '@libs/lash'

import sagaOffersList from '@organisms/OffersList/sagas'
import sagaOffersPaginate from '@molecules/OffersPaginate/sagas'
import sagaOffersSortOptions from '@molecules/OffersSortOptions/sagas'

let serpOffersViewerDitch
let offersListDitch

const { put, take, fork } = sagaEffects


/******************************************************************************/
/***************************** Watchers ***************************************/
/******************************************************************************/
function* watchUpdateActtiveOffer () {
	const { actions } = serpOffersViewerDitch
	const { constants } = offersListDitch

	while (true) {
		const { payload } = yield take(constants.setActiveOffer)
		yield put(actions.setActiveOffer(payload))
	}
}


export default function* (ditch) {
	serpOffersViewerDitch = ditch
	offersListDitch = ditch.getDitch('offersList')
	const { offersSortOptions, offersPaginate } = ditch.getDitches()

	yield [
		fork(sagaOffersList, offersListDitch),
		fork(sagaOffersPaginate, offersPaginate),
		fork(sagaOffersSortOptions, offersSortOptions),
		fork(watchUpdateActtiveOffer),
	]
}
