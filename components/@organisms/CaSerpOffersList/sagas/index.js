import obc from '@libs/obc'
import { saga, sagaEffects } from '@libs/lash'

const { eventChannel } = saga
const { takeEvery, put, call, fork, cancel } = sagaEffects

let channel
let obWatcher


/******************************************************************************/
/***************************** Subroutines ************************************/
/******************************************************************************/

function* actualizeOffers (ditch) {
	const DBStatus = yield call(obc.getStatus)

	const { pagesUpdatedAt, status } = DBStatus

	yield put(ditch.actions.updateStatus({ 
		pagesUpdatedAt, 
		dbStatus: status,
	}))
}


/******************************************************************************/
/***************************** Watchers ***************************************/
/******************************************************************************/

function* watchOBChanges (ditch) {
	yield takeEvery(channel, function* () {
		yield actualizeOffers(ditch)
	})
}

function* watchLifecycle (ditch) {
	const { componentWillMount, componentWillUnmount } = ditch.constants

	yield takeEvery(componentWillMount, function* () {
		channel = eventChannel(obc.observer.on)
		obWatcher = yield fork(watchOBChanges, ditch)
		yield actualizeOffers(ditch)
	})

	yield takeEvery(componentWillUnmount, function* () {
		yield channel.close()
		yield cancel(obWatcher)
	})
}


/******************************************************************************/
/****************************      Root     ***********************************/
/******************************************************************************/

export default function* (ditch) {
	yield [
		fork(watchLifecycle, ditch),
	]
}
