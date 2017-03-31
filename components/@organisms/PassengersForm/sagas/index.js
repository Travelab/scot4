import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, fork, cancel, cancelled, select } = sagaEffects

import birthDateSaga from '../BirthDate/saga.js'
import citizenshipSaga from '../Citizenship/saga.js'
import documentNumberSaga from '../DocumentNumber/saga.js'
import documentValiditySaga from '../DocumentValidity/saga.js'
import firstNameSaga from '../FirstName/saga.js'
import lastNameSaga from '../LastName/saga.js'

function* watchFieldValidation (ditch) {
	const { constants, actions } = ditch
	const {
		setBirthDateValidation,
		setCitizenshipValidation,
		setDocNumValidation,
		setDocValidityValidation,
		setFirstNameValidation,
		setLastNameValidation,
	} = constants
	const selector = ditch.selector.bind(ditch)

	while (true) {
		yield take([
			setBirthDateValidation,
			setCitizenshipValidation,
			setDocNumValidation,
			setDocValidityValidation,
			setFirstNameValidation,
			setLastNameValidation,
		])

		const {
			birthDate,
			citizenship,
			documentNumber,
			documentValidity,
			firstName,
			lastName,
		} = yield select( state => selector(state) )

		const isFormValid = (birthDate.isTouched && birthDate.isValid)
			&& (citizenship.isTouched && citizenship.isValid)
			&& (documentNumber.isTouched && documentNumber.isValid)
			&& ((documentValidity.isTouched && documentValidity.isValid) || !documentValidity.isTouched)
			&& (firstName.isTouched && firstName.isValid)
			&& (lastName.isTouched && lastName.isValid)

		yield put(actions.setFormValidation(isFormValid))
	}
}

function* watchDocTypeChanging (ditch) {
	const { constants, actions } = ditch
	const selector = ditch.selector.bind(ditch)

	while (true) {
		yield take(constants.setDocTypeCode)
		const { documentType } = yield select( state => selector(state) )
		if (documentType.code === 'travel-passport') {
			yield put(actions.setWithoutDocValidity(false))
		}
		else {
			yield put(actions.setWithoutDocValidity(true))
		}
	}
}

/******************************************************************************/
/****************************      Root     ***********************************/
/******************************************************************************/
export default function* (ditch) {

	yield [
		call(birthDateSaga, ditch),
		call(citizenshipSaga, ditch),
		call(documentNumberSaga, ditch),
		call(documentValiditySaga, ditch),
		call(firstNameSaga, ditch),
		call(lastNameSaga, ditch),
		fork(watchFieldValidation, ditch),
		fork(watchDocTypeChanging, ditch)
	]
}
