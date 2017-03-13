import { createEnhancer } from '@utils/decoract'

import Dropdown from '@molecules/Dropdown'
import IconicLabelField from '@atoms/IconicLabelField'
import DayPicker, { DateUtils } from '@atoms/DayPicker'

import calendarIcon from './img/calendar.svg'

import style from './style'

const enhancer = createEnhancer({ style })

class DateRangePicker extends React.Component {

	constructor () {

		super()

		this.state = {
			from: null,
			to: null
		}

		this._handleDayClick = this._handleDayClick.bind(this)
		this._handleDayMouseEnter = this._handleDayMouseEnter.bind(this)
		this._isSelectedDay = this._isSelectedDay.bind(this)
		this._isDisabledDay = this._isDisabledDay.bind(this)
	}

	_getEdgeDays () {

		const { fromDate, toDate, isFromFieldActivated, isToFieldActivated } = this.props

		const from = this.state.from || fromDate
		const to = this.state.to || toDate

		return {
			fromDay: isFromFieldActivated ? from : fromDate,
			toDay: isToFieldActivated ? to : toDate
		}
	} 

	_isSelectedDay (day) {

		const { fromDay, toDay } = this._getEdgeDays()

		return DateUtils.isDayInRange(day, { from: fromDay, to: toDay })
	}


	_isDisabledDay (day) {

		const { isFromFieldActivated, isToFieldActivated } = this.props
		const { fromDay, toDay } = this._getEdgeDays()

		return (
			DateUtils.isPastDay(day)
			|| (isFromFieldActivated && toDay && day > toDay)
			|| (isToFieldActivated && fromDay && day < fromDay)
		)
	}


	_handleDayClick (e, day)  {

		if (this._isDisabledDay(day)) return

		const {
			isFromFieldActivated,
			isToFieldActivated,
			onFromDayClick,
			onToDayClick
		} = this.props

		const { fromDay, toDay } = this._getEdgeDays()

		if (isFromFieldActivated) {
			if (DateUtils.isSameDay(day, toDay)) return

			onFromDayClick(day)
		}
		else if (isToFieldActivated) {
			if (DateUtils.isSameDay(day, fromDay)) return

			onToDayClick(day)
		}
	}

	_handleDayMouseEnter (e, day) {

		if (this._isDisabledDay(day)) return

		const { fromDate, toDate, isFromFieldActivated, isToFieldActivated } = this.props
		const { fromDay, toDay } = this._getEdgeDays()

		if (isFromFieldActivated) {
			if (DateUtils.isSameDay(day, toDay)) return

			this.setState((prevState) => ({ ...prevState, from: day}))
		}
		else if (isToFieldActivated) {
			if (DateUtils.isSameDay(day, fromDay)) return

			this.setState((prevState) => ({ ...prevState, to: day}))
		}
	}

	_renderDayPicker () {

		const { $, fromDate, toDate, isFromFieldActivated, isToFieldActivated, isInlayDropdown } = this.props

		const { fromDay, toDay } = this._getEdgeDays()

		const propsDayPicker = {
			numberOfMonths: isInlayDropdown ? 1 : 2,
			initialMonth: fromDate || new Date(),
			selectedDays: this._isSelectedDay,
			disabledDays: this._isDisabledDay,
			onDayClick: this._handleDayClick,
			onDayMouseEnter: this._handleDayMouseEnter,
			modifiers: {
				from: (day) => DateUtils.isSameDay(day, fromDay),
				to: (day) => DateUtils.isSameDay(day, toDay)
			}
		}

		return (
			<DayPicker { ...propsDayPicker } />
		)
	}

	render () {

		const {
			$,
			l,
			fromDate,
			toDate,
			isFromFieldActivated,
			isToFieldActivated,
			isFromFieldInvalid,
			isToFieldInvalid,
			withSeparator,
			onBlur,
			onFromFieldClick,
			onToFieldClick,
			isInlayDropdown
		} = this.props

		const fromItem = [{
			icon: calendarIcon,
			text: fromDate ? l.date(fromDate, 'shortMonth') : l('Туда')
		}]
		const toItem = [{
			icon: calendarIcon,
			text: toDate ? l.date(toDate, 'shortMonth') : l('Обратно')
		}]

		const onBlurWrapper = () => { /*SetImmediate(onBlur)*/ }

		const propsFromField = {
			items: fromItem,
			isActivated: isFromFieldActivated,
			isInvalid: isFromFieldInvalid && !fromDate,
			withSeparator: true,
			onClick: onFromFieldClick
		}
		const propsToField = {
			items: toItem,
			isActivated: isToFieldInvalid,
			isInvalid: isToFieldInvalid && !toDate,
			withSeparator: withSeparator,
			onClick: onToFieldClick
		}

		const dropdownFields = [
			{
				component: (<IconicLabelField { ...propsFromField } />),
				isActivated: isFromFieldActivated
			},
			{
				component: (<IconicLabelField { ...propsToField } />),
				isActivated: isToFieldActivated
			}
		]
		const dropdownBlock = this._renderDayPicker()

		const propsDropdown = {
			fields: dropdownFields,
			dropdownBlock,
			isDropdownFloatWidth: !isInlayDropdown,
			isInlayDropdown
		}

		return (
			<div className={$.container} tabIndex='1' onBlur={onBlurWrapper}>
				<Dropdown { ...propsDropdown }/>
			</div>
		)
	}
}

export default enhancer(DateRangePicker)

