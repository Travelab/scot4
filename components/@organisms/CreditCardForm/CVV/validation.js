export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	// check expected 3 digits
	if (value.length < 3 && value.length) {
		isInvalid = true
		errorMsg = 'Введен неверный CVV'
	}

	return {
		isInvalid,
		errorMsg
	}
}
