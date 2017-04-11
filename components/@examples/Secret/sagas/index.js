import obc from '@libs/obc'
import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, fork, cancel, cancelled } = sagaEffects

import duck from '../ducks/index'
const { constants, actions } = duck


/******************************************************************************/
/***************************** Subroutines ************************************/
/******************************************************************************/

// Получает актуальный статус из источника и обновляет статус внутри стейта компонента
function* actualizeDBStatus () {

	const DBStatus = yield call(obc.getStatus)

	yield put(actions.updateDBStatus({ DBStatus }))
}


/******************************************************************************/
/***************************** Watchers ***************************************/
/******************************************************************************/

// Следит за изменениями в OB и обновляет статус внутри стейта компонента
function* watchOBChanges () {

	try {
		while (true) {

			yield take(obc.channel)

			yield call(actualizeDBStatus)
		}
	} finally {

		// Просто для примера
		// В этом блоке можно сделать очистку наблюдателя,
		// но в этом случае ничего делать не надо, можно было и без try/catch обойтись
		yield cancelled() && console.log('watchOBChanges cancelled')
	}
}

// Следит за тем, чтобы необходимая работа выполнялась только когда компонент зарендерен
function* watchLifecycle () {

	while (true) {

		yield take(constants.componentWillMount)

		yield call(actualizeDBStatus)

		const watcher = yield fork(watchOBChanges)

		yield take(constants.componentWillUnmount)

		cancel(watcher)
	}
}

// Следит за изменением Пина и сообщает OB о необходимости «применить» фильтр
function* watchPinChanges () {

	while (true) {

		const { payload: { pin } } = yield take(constants.applyPin)

		obc.setFilter(pin)
	}
}


/******************************************************************************/
/***************************** Root *******************************************/
/******************************************************************************/
export default function* () {

	yield [
		fork(watchLifecycle),
		fork(watchPinChanges)
	]
}