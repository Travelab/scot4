export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	if (value.length <= 0) {
		isInvalid = true
		errorMsg = 'Введите имя владельца'
	}

	return {
		isInvalid,
		errorMsg
	}
}
