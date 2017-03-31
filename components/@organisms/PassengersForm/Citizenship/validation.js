export default function (code) {
	let isInvalid = false
	let errorMsg = ''

	if (!code) {
		isInvalid = true
		errorMsg = 'Выберите гражданство'
	}

	return {
		isInvalid,
		errorMsg
	}
}
