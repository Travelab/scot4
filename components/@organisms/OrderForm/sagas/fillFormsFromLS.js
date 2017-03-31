import { keys, difference } from 'lodash'
import { saga, sagaEffects } from '@libs/lash'
const { take, race, put, call, fork, cancel, cancelled, select } = sagaEffects

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

export default function* (ditch) {
	const passengersFormsDitch = ditch.getDitch('passengersForms')
	const { constants } = passengersFormsDitch
	let previousFormsNames = []

	while (true) {
		yield take(constants.updateFormsList)
		const formsNames = keys(passengersFormsDitch.getDitches())
		const newFormsNames = difference(formsNames, previousFormsNames)
		if (isLocalStorageSupported()) {
			const formsState = newFormsNames.map((name) => {
				const jsonState = window.localStorage[name]
				return {
					name: name,
					fields: jsonState && JSON.parse(jsonState)
				}
			})
			const formsLen = formsState.length
			for (let i = 0; i < formsLen; i++) {
				const form = formsState[i]
				const formFieldsNames = keys(form.fields)
				const formFieldsLen = formFieldsNames.length
				for (let i = 0; i < formFieldsLen; i++) {
					const fieldName = formFieldsNames[i]
					const formDitch = passengersFormsDitch.getDitch(form.name)
					const { actions } = formDitch
					const {
						birthDate,
						citizenship,
						documentNumber,
						documentType,
						documentValidity,
						firstName,
						gender,
						lastName
					} = form.fields
					if (fieldName === 'birthDate') {
						yield [
							put(actions.setBirthDateDay(birthDate.dayValue)),
							put(actions.setBirthDateMonth(birthDate.monthValue)),
							put(actions.setBirthDateYear(birthDate.yearValue))
						]
					}
					else if (fieldName === 'citizenship') {
						yield put(actions.setCitizenshipInputValue(citizenship))
					}
					else if (fieldName === 'documentNumber') {
						yield put(actions.setDocNumValue(documentNumber))
					}
					else if (fieldName === 'documentValidity') {
						yield [
							put(actions.setDocValidityDay(documentValidity.dayValue)),
							put(actions.setDocValidityMonth(documentValidity.monthValue)),
							put(actions.setDocValidityYear(documentValidity.yearValue))
						]
					}
					else if (fieldName === 'firstName') {
						yield put(actions.setFirstNameValue(firstName))
					}
					else if (fieldName === 'gender') {
						yield put(actions.setGenderValue(gender))
					}
					else if (fieldName === 'lastName') {
						yield put(actions.setLastNameValue(lastName))
					}
				}
			}
		}
		previousFormsNames = formsNames
	}
}
