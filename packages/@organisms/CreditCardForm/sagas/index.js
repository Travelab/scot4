import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, fork, cancel, cancelled, select } = sagaEffects

import cardNumberSaga from '../CardNumber/saga.js'
import cvvSaga from '../CVV/saga.js'
import expDateSaga from '../ExpirationDate/saga.js'
import holderSaga from '../Holder/saga.js'

function* watchFieldValidation (ditch) {
	const { constants, actions } = ditch
	const {
		setCardNumberValidation,
		setCVVValidation,
		setExpDateValidation,
		setHolderValidation,
	} = constants
	const selector = ditch.selector.bind(ditch)

	while (true) {
		yield take([
			setCardNumberValidation,
			setCVVValidation,
			setExpDateValidation,
			setHolderValidation,
		])

		const {
			cardNumber,
			cvv,
			expirationDate,
			holder,
		} = yield select( state => selector(state) )

		const isFormValid = (cardNumber.isTouched && cardNumber.isValid)
			&& (cvv.isTouched && cvv.isValid)
			&& (expirationDate.isTouched && expirationDate.isValid)
			&& (holder.isTouched && holder.isValid)

		yield put(actions.setFormValidation(isFormValid))
	}
}

/******************************************************************************/
/****************************      Root     ***********************************/
/******************************************************************************/
export default function* (ditch) {

	yield [
		call(cardNumberSaga, ditch),
		call(cvvSaga, ditch),
		call(expDateSaga, ditch),
		call(holderSaga, ditch),
		fork(watchFieldValidation, ditch)
	]
}
