import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, spawn, cancel, cancelled, select } = sagaEffects

import validationCheck from './validation.js'

function* validationTask (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)
	const { setBirthDateTouched } = constants

	while (true) {
		const { payload: isTouched } = yield take(setBirthDateTouched)
		if (isTouched) {
			const { dayValue, monthValue, yearValue } = yield select(state => selector(state).birthDate)
			const { isInvalid, errorMsg } = yield call(validationCheck, dayValue, monthValue, yearValue)
			yield put(actions.setBirthDateValidation({ isValid: !isInvalid, errorMsg }))
		}
	}
}

export default function* (ditch) {
	yield spawn(validationTask, ditch)
}
