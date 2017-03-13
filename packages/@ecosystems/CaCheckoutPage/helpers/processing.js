import { get } from 'lodash'


export function processCard (creditCard) {
	const cardData = {}

	cardData['pan'] = creditCard.cardNumber.value.replace(/\s/g, '')
	cardData['cardholder'] = creditCard.holder.value
	cardData['valid_month'] = creditCard.expirationDate.monthValue
	cardData['valid_year'] = creditCard.expirationDate.yearValue
	cardData['cvv'] = creditCard.cvv.value

	return cardData
}

export function processPassenger (passForm) {
	const pass = { is_incomplete: false }

	pass['first_name'] = passForm.firstName.value
	pass['last_name'] = passForm.lastName.value
	pass['category'] = get(passForm, 'category.value', 'adult')
	pass['citizenship'] = passForm.citizenship.code
	pass['gender'] = passForm.gender.value

	const docNum = passForm.documentNumber.value.replace(/[^\w]/g, '')

	pass['passport_series'] = docNum.slice(0, 2)
	pass['passport_number'] = docNum.slice(2)
	pass['passport_type'] = passForm.documentType.code
	if (pass['passport_type'] === 'travel-passport') {
		const validity = passForm.documentValidity
		pass['passport_validity'] = `${validity.yearValue}-${validity.monthValue}-${validity.dayValue}`
	}
	else {
		const today = new Date()
		pass['passport_validity'] = `${today.getFullYear() + 10}-01-01`
	}

	const birthday = passForm.birthDate
	pass['birthday'] = `${birthday.yearValue}-${birthday.monthValue}-${birthday.dayValue}`

	return pass
}
