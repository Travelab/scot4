import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, fork, cancel, cancelled, select } = sagaEffects

import emailSaga from '../Email/saga.js'
import phoneSaga from '../Phone/saga.js'

function* watchFieldValidation (ditch) {
	const { constants, actions } = ditch
	const {
		setEmailValidation,
		setPhoneValidation,
	} = constants
	const selector = ditch.selector.bind(ditch)

	while (true) {
		yield take([
			setEmailValidation,
			setPhoneValidation,
		])

		const {
			email,
			phone,
		} = yield select( state => selector(state) )

		const isFormValid = (email.isTouched && email.isValid)
			&& (phone.isTouched && phone.isValid)

		yield put(actions.setFormValidation(isFormValid))
	}
}

/******************************************************************************/
/****************************      Root     ***********************************/
/******************************************************************************/
export default function* (ditch) {

	yield [
		call(emailSaga, ditch),
		call(phoneSaga, ditch),
		fork(watchFieldValidation, ditch)
	]
}
