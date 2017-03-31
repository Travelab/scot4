import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, spawn, cancel, cancelled, select } = sagaEffects

import validationCheck from './validation.js'

function* validationTask (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)
	const { activateCitizenship, deactivateCitizenship } = constants

	while (true) {
		yield take([ activateCitizenship, deactivateCitizenship ])
		const { isTouched, code } = yield select(state => selector(state).citizenship)
		if (isTouched) {
			const { isInvalid, errorMsg } = yield call(validationCheck, code)
			yield put(actions.setCitizenshipValidation({ isValid: !isInvalid, errorMsg }))
		}
	}
}

export default function* (ditch) {
	yield spawn(validationTask, ditch)
}
