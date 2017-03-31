import IntlMessageFormat from 'intl-messageformat'
import { assignIn } from 'lodash'

// Дичь из файла /intl-messageformat/dist/locale-data/ru.js
// Потому что он не умеет CommonJS
IntlMessageFormat.__addLocaleData({"locale":"ru","pluralRuleFunction":function (n,ord){var s=String(n).split("."),i=s[0],v0=!s[1],i10=i.slice(-1),i100=i.slice(-2);if(ord)return"other";return v0&&i10==1&&i100!=11?"one":v0&&(i10>=2&&i10<=4)&&(i100<12||i100>14)?"few":v0&&i10==0||v0&&(i10>=5&&i10<=9)||v0&&(i100>=11&&i100<=14)?"many":"other"}});
IntlMessageFormat.__addLocaleData({"locale":"ru-BY","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-KG","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-KZ","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-MD","parentLocale":"ru"});
IntlMessageFormat.__addLocaleData({"locale":"ru-UA","parentLocale":"ru"});


const lang = 'ru-RU'

const customFormat = {
	date: {
		shortMonth: {
			style: 'date',
			day: 'numeric',
			month: 'short'
		},
		longMonth: { month: 'long', day: 'numeric' },
		weekday: { weekday: 'long' }
	},

}

const l = (l, values) => {

	if (values) {

		l = new IntlMessageFormat(l, lang, customFormat)

		return l.format(values)
	}

	return l
}

/*===== Posible types: undefined (default), percent ======
percent — is used to format values which are percentages
*/
const number = (val, type) => {

	let msg = type ? `{val, number, ${type}}` : '{val, number}'

	return l(msg, { val })
}

/*===== Posible types: short (default), full ======
short — is used to format currency without fractionals
full — is used to format currency with fractionals
*/
const currency = (val, currency = 'RUB', type = 'short') => {

	const msg = new IntlMessageFormat('{val, number, currency}', lang, {
		number: {
			currency: {
				style: 'currency',
				currency,
				maximumFractionDigits: type === 'short' ? 0 : 2,
				minimumFractionDigits: type === 'short' ? 0 : 2
			}
		}
	})

	return msg.format({ val })
}

/*===== Posible types: short (default), medium, long, full ======
short — is used to format dates in the shortest possible way
medium — is used to format dates with short textual representation of the month
long — is used to format dates with long textual representation of the month
full — is used to format dates with the most detail
*/
const date = (val, type = 'short') => {

	return l(`{val, date, ${type}}`, { val })
}

/*===== Posible types: short (default), medium, long, full ======
short — is used to format times with hours and minutes
medium — is used to format times with hours, minutes, and seconds
long — is used to format times with hours, minutes, seconds, and timezone
full — is the same as long
*/
const time = (val, type = 'short') => {

	return l(`{val, time, ${type}}`, { val })
}

assignIn(l, {
	lang,
	number,
	currency,
	date,
	time
})

export default l
