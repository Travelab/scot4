import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, spawn, cancel, cancelled, select } = sagaEffects

import validationCheck from './validation.js'

function* validationTask (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)
	const { setEmailTouched } = constants

	while (true) {
		yield take(setEmailTouched)
		const { isTouched, value } = yield select(state => selector(state).email)
		if (isTouched) {
			const { isInvalid, errorMsg } = yield call(validationCheck, value)
			yield put(actions.setEmailValidation({ isValid: !isInvalid, errorMsg }))
		}
	}
}

export default function* (ditch) {
	yield spawn(validationTask, ditch)
}
