export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	// check digits only
	if (!value.slice(1).match(/^\d*$/)) {
		isInvalid = true
		errorMsg = 'Введен неверный номер'
	}

	// check empty
	if (value.length <= 0) {
		isInvalid = true
		errorMsg = 'Введите номер телефона'
	}

	return {
		isInvalid,
		errorMsg
	}
}
