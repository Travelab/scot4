export default function (day, month, year) {

	let isInvalid = false
	let errorMsg = ''

	// check year
	const yearNum = parseInt(year)
	const currentDate = new Date()
	if (yearNum < 1900 || year > currentDate.getFullYear()) {
		isInvalid = true
		errorMsg = `Введена неверная дата рождения`
	}

	// check full date
	const monthNum = parseInt(month)
	const dayNum = parseInt(day)
	const inputedDate = new Date(yearNum, monthNum - 1, dayNum)
	if (inputedDate > currentDate) {
		isInvalid = true
		errorMsg = 'Введена неверная дата рождения'
	}

	// check valid date
	const validDate = inputedDate.getFullYear() === yearNum
		&& inputedDate.getMonth() === monthNum - 1
		&& inputedDate.getDate() === dayNum
	if (!validDate) {
		isInvalid = true
		errorMsg = 'Введена неверная дата рождения'
	}

	// check for not empty
	if (!day || !month || !year) {
		isInvalid = true
		errorMsg = 'Введите дату рождения полностью'
	}

	return {
		isInvalid,
		errorMsg
	}
}
