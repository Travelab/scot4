import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, spawn, cancel, cancelled, select } = sagaEffects

import validationCheck from './validation.js'

function* validationTask (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)
	const { setDocNumTouched } = constants

	while (true) {
		yield take(setDocNumTouched)
		const { isTouched, value } = yield select(state => selector(state).documentNumber)
		if (isTouched) {
			const { isInvalid, errorMsg } = yield call(validationCheck, value)
			yield put(actions.setDocNumValidation({ isValid: !isInvalid, errorMsg }))
		}
	}
}

export default function* (ditch) {
	yield spawn(validationTask, ditch)
}
