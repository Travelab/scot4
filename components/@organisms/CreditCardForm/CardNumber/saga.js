import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, spawn, cancel, cancelled, select } = sagaEffects

import validationCheck from './validation.js'

function* validationTask (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)
	const { setCardNumberTouched } = constants

	while (true) {
		yield take(setCardNumberTouched)
		const { isTouched, value } = yield select(state => selector(state).cardNumber)
		if (isTouched) {
			const { isInvalid, errorMsg } = yield call(validationCheck, value)
			yield put(actions.setCardNumberValidation({ isValid: !isInvalid, errorMsg }))
		}
	}
}

export default function* (ditch) {
	yield spawn(validationTask, ditch)
}
