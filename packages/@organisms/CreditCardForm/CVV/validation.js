export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	// check expected 3 digits
	if (value.length < 3) {
		isInvalid = true
		errorMsg = 'Введен неверный CVV'
	}

	// check empty
	if (value.length <= 0) {
		isInvalid = true
		errorMsg = 'Введите CVV'
	}

	return {
		isInvalid,
		errorMsg
	}
}
