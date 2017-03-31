import obc from '@libs/obc'
import { saga, sagaEffects } from '@libs/lash'

let offersPaginateDitch
let channel

const { take, put, call, fork, cancel } = sagaEffects
const { eventChannel } = saga


function* actualizeDBStatus () {
	const { actions } = offersPaginateDitch

	const DBStatus = yield call(obc.getStatus)
	const { dbUpdatedAt, pagesUpdatedAt } = DBStatus

	yield put(actions.updateDBStatus({ dbUpdatedAt, pagesUpdatedAt }))
}


function* watchOBChanges () {
	while (true) {
		yield take(channel)

		yield call(actualizeDBStatus)
	}
}

function* watchPageChanges () {
	const { constants, actions } = offersPaginateDitch

	while (true) {
		const { payload } = yield take(constants.changePage)

		yield call(obc.setPage, payload)
		yield put(actions.hideBalloon())
		yield call(window.scrollTo, 0, 0)
	}
}

function* watchLifecycle () {
	const { constants } = offersPaginateDitch

	while (true) {

		const action = yield take(constants.componentWillMount)

		channel = eventChannel(obc.observer.on)

		yield call(actualizeDBStatus)

		const obWatcher = yield fork(watchOBChanges)
		const actionWatcher = yield fork(watchPageChanges)

		yield take(constants.componentWillUnmount)

		channel.close()
		cancel(obWatcher)
		cancel(actionWatcher)
	}
}


export default function* (ditch) {
	offersPaginateDitch = ditch

	yield [
		fork(watchLifecycle),
	]
}
