import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, spawn, cancel, cancelled, select } = sagaEffects

import validationCheck from './validation.js'

function* validationTask (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)
	const { setDocValidityTouched } = constants

	while (true) {
		yield take(setDocValidityTouched)
		const { isTouched, dayValue, monthValue, yearValue } = yield select(state => selector(state).documentValidity)
		if (isTouched) {
			const { isInvalid, errorMsg } = yield call(validationCheck, dayValue, monthValue, yearValue)
			yield put(actions.setDocValidityValidation({ isValid: !isInvalid, errorMsg }))
		}
	}
}

export default function* (ditch) {
	yield spawn(validationTask, ditch)
}
