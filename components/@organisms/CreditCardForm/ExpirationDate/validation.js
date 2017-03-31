export default function (month, year) {

	let isInvalid = false
	let errorMsg = ''

	if (month.length && year.length) {
		// check full date
		const yearNum = parseInt('20' + year)
		const monthNum = parseInt(month)
		const currentDate = new Date()
		currentDate.setHours(0,0,0,0)
		const inputedDate = new Date(yearNum, monthNum - 1, currentDate.getDate())
			if (inputedDate < currentDate) {
			isInvalid = true
			errorMsg = 'Введена неверная дата'
		}

		// check valid date
		const validDate = inputedDate.getFullYear() === yearNum
			&& inputedDate.getMonth() === monthNum - 1
			if (!validDate) {
			isInvalid = true
			errorMsg = 'Введена неверная дата'
		}
	}

	return {
		isInvalid,
		errorMsg
	}
}
