import { difference, omit, mapValues, values, keys } from 'lodash'
import { saga, sagaEffects } from '@libs/lash'
const { take, race, put, call, fork, cancel, cancelled, select } = sagaEffects

import sagaPassengersDataList from '@organisms/PassengersDataList/sagas'
import sagaCreditCardForm from '@organisms/CreditCardForm/sagas'
import sagaCustomerForm from '@organisms/CustomerForm/sagas'

import fillFormsFromLS from './fillFormsFromLS.js'

// function for check local storage (fucking Safari)
const isLocalStorageSupported = () => {
	const testKey = 'test'
	const storage = window.localStorage
	if (!storage) return false

	try {
		storage.setItem(testKey, '1')
		storage.removeItem(testKey)

		return true
	}
	catch (e) {
		return false
	}
}

let orderFormDitch

function* throwBuyAction () {
	const { actions } = orderFormDitch
	yield put(actions.buy())
}

function* watchBuyClick (ditch) {

	const { constants } = ditch

	try {
		while (true) {

			yield take(constants.buy)

			yield call(throwBuyAction)
		}
	} finally {

		if (yield cancelled()) console.log('Was cancelled')
	}
}

const getFormValidationConstants = (ditch) => {
	const formsDitches = ditch.getDitches()
	const getSetFormValidationConstant = (ditch) => ditch.constants.setFormValidation
	const setFormValidationConstantsByDitchesName = mapValues(formsDitches, getSetFormValidationConstant)

	return values(setFormValidationConstantsByDitchesName)
}

function* watchPassengersFormChanging (ditch) {
	const passengersFormsDitch = ditch.getDitch('passengersForms')
	let setFormValidationConstants = getFormValidationConstants(passengersFormsDitch)

	while (true) {
		const { updated, validationSet } = yield race({
			updated: take(passengersFormsDitch.constants.updateFormsList),
			validationSet: take(setFormValidationConstants)
		})

		if (updated) setFormValidationConstants = getFormValidationConstants(passengersFormsDitch)
		else if (validationSet) {
			const formName = validationSet.type.split('/')[0]
			const formDitch = passengersFormsDitch.getDitch(formName)
			const formSelector = formDitch.selector.bind(formDitch)
			const formState = yield select( state => formSelector(state) )
			const getFieldValue = (field, name) => {
				if (name === 'birthDate' || name === 'documentValidity') {
					return {
						dayValue: field.dayValue,
						monthValue: field.monthValue,
						yearValue: field.yearValue
					}
				}
				else if (name === 'citizenship') return field.inputValue
				else return field.value
			}
			const formValuesByFields = omit(mapValues(formState, getFieldValue), ['isValid', 'withoutDocValidity'])

			if (isLocalStorageSupported()) {
				window.localStorage.setItem(formName, JSON.stringify(formValuesByFields))
			}
		}
	}
}

export default function* (ditch) {
	orderFormDitch = ditch
	const { creditCardDitch, customerFormDitch, passengersDataListDitch, paymentDetailsDitch } = ditch.getDitches()

	yield [
		fork(watchBuyClick, paymentDetailsDitch),
		fork(sagaPassengersDataList, passengersDataListDitch),
		fork(sagaCreditCardForm, creditCardDitch),
		fork(sagaCustomerForm, customerFormDitch),
		fork(watchPassengersFormChanging, passengersDataListDitch),
		fork(fillFormsFromLS, passengersDataListDitch)
	]
}
