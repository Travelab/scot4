/**
 * Luhn algorithm in JavaScript: validate credit card number supplied as string of numbers
 * @author ShirtlessKirk. Copyright (c) 2012.
 * @license WTFPL (http://www.wtfpl.net/txt/copying)
 */
var luhnChk = (function (arr) {
		return function (ccNum) {
				var
						len = ccNum.length,
						bit = 1,
						sum = 0,
						val;

				while (len) {
						val = parseInt(ccNum.charAt(--len), 10);
						sum += (bit ^= 1) ? arr[val] : val;
				}

				return sum && sum % 10 === 0;
		};
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

export default function (value) {
	let isInvalid = false
	let errorMsg = ''

	const valueWithoutSpace = value.split(' ').join('')
	if (!luhnChk(valueWithoutSpace)) {
		isInvalid = true
		errorMsg = 'Введен неверный номер карты'
	}

	if (value.length <= 0) {
		isInvalid = true
		errorMsg = 'Введите номер карты'
	}

	return {
		isInvalid,
		errorMsg
	}
}
