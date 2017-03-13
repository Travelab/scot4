
import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, fork, cancel, cancelled } = sagaEffects

import duck from '../ducks'
const { constants, actions } = duck


function* bgTimer() {

	try {

		while (true) {
			yield put(actions.tick())
			yield call(saga.delay, 1000)
		}

	} finally {

		if (yield cancelled()) {

			console.log('Таймер был остановлен руками!')
		}
	}
}

export default function* () {

	while ( yield take(constants.start) ) {

		const bgTimerTask = yield fork(bgTimer)

		yield take(constants.stop)

		yield cancel(bgTimerTask)
	}
}
