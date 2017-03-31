export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	if (value.length) {
		// check digits only
		if (!value.match(/^(?:\+)?(?:\d)+$/)) {
			isInvalid = true
			errorMsg = 'Введен неверный номер'
		}
	}

	return {
		isInvalid,
		errorMsg
	}
}
