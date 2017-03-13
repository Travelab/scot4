import { sagaEffects } from '@libs/lash'
import serpOffersViewerDuck from '@ecosystems/SerpOffersViewer/ducks'
import serpMapDuck from '@ecosystems/SerpMap/ducks'

import sagaSerpMap from '@ecosystems/SerpMap/sagas'
import sagaOffersViewer from '@ecosystems/SerpOffersViewer/sagas'

let serpSearchResultsDitch
let serpMapDitch
let serpOffersViewerDitch

const { put, take, fork } = sagaEffects

function* watchUpdateActtiveOffer () {
	const { constants } = serpOffersViewerDitch
	const { actions } = serpMapDitch

	while (true) {
		const { payload } = yield take(constants.setActiveOffer)
		yield put(actions.setActiveOffer(payload))
	}
}

export default function* (ditch) {
	serpSearchResultsDitch = ditch
	serpMapDitch = ditch.getDitch('serpMap')
	serpOffersViewerDitch = ditch.getDitch('serpOffersViewer')

	yield [
		fork(sagaSerpMap, serpMapDitch),
		fork(sagaOffersViewer, serpOffersViewerDitch),
		fork(watchUpdateActtiveOffer),
	]
}
