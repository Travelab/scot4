import { createDuck } from '@libs/lash'

import firstName from '../FirstName/duck.js'
import lastName from '../LastName/duck.js'
import birthDate from '../BirthDate/duck.js'
import citizenship from '../Citizenship/duck.js'
import documentNumber from '../DocumentNumber/duck.js'
import gender from '../Gender/ducks.js'
import docType from '../DocumentTypeComponent/duck.js'
import docValidity from '../DocumentValidity/duck.js'

const initialState = {
	firstName: firstName.initialState,
	lastName: lastName.initialState,
	birthDate: birthDate.initialState,
	citizenship: citizenship.initialState,
	documentNumber: documentNumber.initialState,
	gender: gender.initialState,
	documentType: docType.initialState,
	documentValidity: docValidity.initialState,
	withoutDocValidity: true,
	isValid: false
}

export default createDuck({
	name: 'passengersForm',
	initialState,
	isfwl: true,
	transformations: {
		...firstName.transformations,
		...lastName.transformations,
		...birthDate.transformations,
		...citizenship.transformations,
		...documentNumber.transformations,
		...gender.transformations,
		...docType.transformations,
		...docValidity.transformations,

		setFormValidation: (state, { payload: isValid }) => ({
			...state,
			isValid
		}),
		setWithoutDocValidity: (state, { payload }) => ({
			...state,
			withoutDocValidity: payload
		}),
	}
})
