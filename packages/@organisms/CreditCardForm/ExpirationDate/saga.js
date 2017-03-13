import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, spawn, cancel, cancelled, select } = sagaEffects

import validationCheck from './validation.js'

function* validationTask (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)
	const { setExpDateTouched } = constants

	while (true) {
		yield take(setExpDateTouched)
		const { isTouched, monthValue, yearValue } = yield select(state => selector(state).expirationDate)
		if (isTouched) {
			const { isInvalid, errorMsg } = yield call(validationCheck, monthValue, yearValue)
			yield put(actions.setExpDateValidation({ isValid: !isInvalid, errorMsg }))
		}
	}
}

export default function* (ditch) {
	yield spawn(validationTask, ditch)
}
