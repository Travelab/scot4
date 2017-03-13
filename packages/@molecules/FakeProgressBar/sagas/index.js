import { saga, sagaEffects } from '@libs/lash'
const { select, take, put, call, fork, spawn, cancel, cancelled } = sagaEffects

// import duck from '../ducks'
// const { actions, constants } = duck
let barDitch = null

function* barController () {
	const { constants, actions } = barDitch

	while (true) {
		// yield take(constants.start)
		// yield put(actions.setPercent(0))
		const incrementTask = yield fork(incrementPercent)
		yield take(constants.stop)
		yield put(actions.setPercent(100))
		yield cancel(incrementTask)
	}
}

function* incrementPercent () {
	const { actions } = barDitch

	try {
		while (true) {
			const percentState = yield select((state) => state.percent)

			yield put(actions.setPercent(percentState + 1))

			if (percentState < 50) {
				yield call(saga.delay, 200)
			}
			else if (percentState < 75) {
				yield call(saga.delay, 700)
			}
			else if (percentState < 95) {
				yield call(saga.delay, 2000)
			}
			else {
				yield call(saga.delay, 12000000) // sleep and no increment
			}
		}
	}
	finally {
		if (yield cancelled()) console.log('cancelledi increment')
	}
}

// Следит за тем, чтобы необходимая работа выполнялась только когда компонент зарендерен
function* watchLifecycle () {
	const { constants } = barDitch

	while (true) {

		const action = yield take(constants.componentWillMount)

		const controller = yield fork(barController)

		yield take(constants.componentWillUnmount)

		yield cancel(controller)
	}
}

export default function* (ditch) {
	barDitch = ditch
	yield fork(watchLifecycle)
}
