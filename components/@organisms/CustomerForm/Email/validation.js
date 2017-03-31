export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	if (value.length) {
		// check input
		const notValidEmail = value[0] === '@'
			|| value.indexOf('@') === -1
		if (notValidEmail) {
			isInvalid = true
			errorMsg = 'Введен неверный e-mail'
		}
	}

	return {
		isInvalid,
		errorMsg
	}
}
