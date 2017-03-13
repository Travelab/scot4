import obc from '@libs/obc'
import { saga, sagaEffects } from '@libs/lash'

import duck from '../ducks'

const { take, put, call, fork, cancel, cancelled } = sagaEffects
const { eventChannel } = saga
const { constants, actions } = duck

let channel
let serpMapDitch
let travelabMapDitch

const createChannel = (target, eventName) => eventChannel(emitter => {
	const listener = event => emitter(event)
	target.addEventListener(eventName, listener, false)
	return () => {
		target.removeEventListener(eventName, listener)
	}
})


/******************************************************************************/
/***************************** Subroutines ************************************/
/******************************************************************************/

// Получает актуальный статус из источника и обновляет статус внутри стейта компонента
function* actualizeDBStatus () {
	const { actions } = serpMapDitch

	const DBStatus = yield call(obc.getStatus)
	const pagesUpdatedAt = DBStatus.pagesUpdatedAt
	const reset = DBStatus.status === obc.START_LOADING

	if (reset) yield put(travelabMapDitch.actions.reset())

	yield put(actions.updateDBStatus({ pagesUpdatedAt, reset }))
}

function* resize () {
	const { actions } = serpMapDitch

	const w = window
	const d = document
	const e = d.documentElement
	const g = d.getElementsByTagName('body')[0]

	const height = w.innerHeight || e.clientHeight || g.clientHeight

	yield put(actions.resize({ height }))
}


/******************************************************************************/
/***************************** Watchers ***************************************/
/******************************************************************************/

// Следит за изменениями в OB и обновляет статус внутри стейта компонента
function* watchOBChanges () {

	try {
		while (true) {

			yield take(channel)

			yield call(actualizeDBStatus)
		}
	} finally {

		yield cancelled() && console.log('watchOBChanges cancelled')
	}
}

function* watchWindowResize () {
	const resizeingChannel = yield call(createChannel, window, 'resize')

	try {
		while (true) {
			yield take(resizeingChannel)
			yield call(resize)
		}
	} finally {
		if (yield cancelled()) {
			yield resizeingChannel.close()
		}
	}
}

function* watchFiltersChange () {
	const { constants } = travelabMapDitch
	while (true) {
		const { payload } = yield take(constants.setBounds)
		if (payload.enableFilter) {
			const { bounds: { nw, se  } } = payload
			yield call(obc.setFilter, { bounds: { nw, se } })
		}
	}
}

function* watchLifecycle () {
	const { constants } = serpMapDitch

	while (true) {

		const action = yield take(constants.componentWillMount)

		channel = eventChannel(obc.observer.on)

		yield call(actualizeDBStatus)

		const obWatcher = yield fork(watchOBChanges)
		const filterWatcher = yield fork(watchFiltersChange)
		const resizeWatcher = yield fork(watchWindowResize)

		yield take(constants.componentWillUnmount)

		channel && channel.close()

		cancel(obWatcher)
		cancel(filterWatcher)
		cancel(resizeWatcher)
	}
}


/******************************************************************************/
/***************************** Root *******************************************/
/******************************************************************************/
export default function* (ditch) {
	serpMapDitch = ditch
	travelabMapDitch = serpMapDitch.getDitch('travelabMap')

	yield [
		fork(watchLifecycle),
	]
}
