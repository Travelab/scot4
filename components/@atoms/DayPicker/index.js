import { createEnhancer } from '@utils/decoract'
import DayPicker, { DateUtils } from 'react-day-picker'

import style from './style'

const enhancer = createEnhancer({ style })

const DayPickerWrapper = ({ $, l, ...props }) => {

	const weekdaysLong = [
		l('Воскресенье'),
		l('Понедельник'),
		l('Вторник'),
		l('Среда'),
		l('Четверг'),
		l('Пятница'),
		l('Суббота')
	]
	const weekdaysShort = [
		l('Вс'), l('Пн'), l('Вт'), l('Ср'), l('Чт'), l('Пт'), l('Сб')
	]
	const months = [
		l('Январь'), l('Февраль'), l('Март'), l('Апрель'),
		l('Май'), l('Июнь'), l('Июль'), l('Август'),
		l('Сентябрь'), l('Октябрь'), l('Ноябрь'), l('Декабрь')
	]
	const firstDayOfWeek = {
		'ru-Ru': 1,
	}

	const localeUtils = {
		formatDay: (d) => (
			`${weekdaysLong[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
		),
		formatWeekdayShort: (index) => weekdaysShort[index],
		formatWeekdayLong: (index) => weekdaysLong[index],
		getFirstDayOfWeek: (locale = 'ru-Ru') => firstDayOfWeek['ru-Ru'],
		getMonths: () => months,
		formatMonthTitle: (d) => `${months[d.getMonth()]} ${d.getFullYear()}`,
	}

	const propsDayPicker = {
		// numberOfMonths: 2,
		fromMonth: new Date(),
		locale: l.lang,
		localeUtils,
		...props
	}

	return (
		<DayPicker { ...propsDayPicker } />
	)
}

export default enhancer(DayPickerWrapper)

export { DateUtils } from 'react-day-picker'

