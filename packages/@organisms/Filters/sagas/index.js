import obc from '@libs/obc'
import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, fork, select, cancel, cancelled } = sagaEffects

//import duck from '../ducks'
//const { constants, actions } = duck
let filtersDitch = null

function* setObcFilters ({ type, payload }) {
	let filters = {}
	const { constants } = filtersDitch

	switch (type) {
		case constants.setFilter:
			const filterPath = payload.path
			const filterValue = payload.value

			filters[filterPath[0]] = {
				[filterPath[1]]: filterValue
			}
			break

		case constants.toggleStars:
			const starsState = yield select((state) => state.stars)
			yield call(console.log, starsState)
			// filters.stars = starsState.map((el, i) => el ? i + 1 : el).filter((el) => el)
			break

		default:
			break
	}

	yield call(console.log, filters)

	// yield call(obc.setFilter, filters)
}

function* watchFiltersChange () {
	const { constants } = filtersDitch

	while (true) {
		const action = yield take([
			constants.setFilter,
			constants.toggleStars
		])

		yield fork(setObcFilters, action)
	}
}


// Check new offers from OB through OBC
// if need offers uncomment block below
	/*
function* watchOBCEvents (channel) {
	while (true) {
		yield take(channel)

		// get and actualize db updated time
		const DBStatus = yield call(obc.getStatus)

		yield put(actions.setDbUpdatedAt(DBStatus.dbUpdatedAt))
	}
}

function* watchLifecycle () {
	while (true) {
		yield take(constants.componentWillMount)

		const obcEventsChannel = saga.eventChannel(obc.observer.on)
		const obcWatcher = yield fork(watchOBCEvents, obcEventsChannel)

		yield take(constants.componentWillUnmount)

		yield cancel(obcWatcher)
	}
}*/

export default function* (ditch) {

	filtersDitch = ditch

	yield [
		fork(watchFiltersChange)/*,
		fork(watchLifecycle)*/ // if need offers uncomment this line
	]
}
