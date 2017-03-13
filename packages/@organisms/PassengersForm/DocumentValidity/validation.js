export default function (day, month, year) {

	let isInvalid = false
	let errorMsg = ''

	// check full date
	const yearNum = parseInt(year)
	const monthNum = parseInt(month)
	const dayNum = parseInt(day)
	const currentDate = new Date()
	const inputedDate = new Date(yearNum, monthNum - 1, dayNum)
	if (inputedDate < currentDate) {
		isInvalid = true
		errorMsg = 'Введена неверная дата'
	}

	// check valid date
	const validDate = inputedDate.getFullYear() === yearNum
		&& inputedDate.getMonth() === monthNum - 1
		&& inputedDate.getDate() === dayNum
	if (!validDate) {
		isInvalid = true
		errorMsg = 'Введена неверная дата'
	}

	// check for not empty
	if (!day || !month || !year) {
		isInvalid = true
		errorMsg = 'Введите срок действия документа'
	}

	return {
		isInvalid,
		errorMsg
	}
}
