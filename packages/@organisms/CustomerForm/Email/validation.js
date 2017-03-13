export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	// check input
	const notValidEmail = value[0] === '@'
		|| value.indexOf('@') === -1
	if (notValidEmail) {
		isInvalid = true
		errorMsg = 'Введен неверный e-mail'
	}

	// check empty
	if (value.length <= 0) {
		isInvalid = true
		errorMsg = 'Введите адрес эл. почты'
	}

	return {
		isInvalid,
		errorMsg
	}
}
