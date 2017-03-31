import { createEnhancer } from '@utils/decoract'

import InputField from '@atoms/InputField'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
})

class DateInputField extends React.Component {

	_renderDayInputField () {
		const {
			$,
			l,
			dayValue,
			focusedInput,
			onDayChange,
			onMonthChange,
			setFocusedInput
		} = this.props

		const isDayMatchedMask = (value) => (
			value.match(/(?:^0[1-9]?$)|(?:^[1-2][0-9]?$)|(?:^3[0,1]?$)/)
		)
		const checkDayInput = (value) => {
			if (!value.match(/^\d*$/)) return

			if (value.length <= 0 || isDayMatchedMask(value)) {
				onDayChange(value)
				if (value.length === 2) setFocusedInput('MonthInput')
			}
			else if (value.length === 1) {
				onDayChange('0' + value)
				setFocusedInput('MonthInput')
			}
			else if (value.length === 2) {
				const valueNum = parseInt(value)
				let newValue = ''
				if (valueNum < 1) newValue = '01'
				else if (valueNum > 31) newValue = '31'
				onDayChange(newValue)
				setFocusedInput('MonthInput')
			}
			else {
				onDayChange(value.slice(0, 2))
				onMonthChange(value.slice(2, 3))
				setFocusedInput('MonthInput')
			}
		}

		const propsDayInputField = {
			value: dayValue,
			placeholder: l('дд'),
			isFocused: focusedInput === 'DayInput',
			onClick: () =>  setFocusedInput('DayInput'),
			onChange: checkDayInput,
			onKeyDown: (e) => {
				if (e.key === 'Tab' && !e.shiftKey) {
					e.preventDefault()
					setFocusedInput('MonthInput')
				}
			},
			onBlur: () => {
				if (dayValue.length === 1) {
					const valueNum = parseInt(dayValue)
					if (valueNum) onDayChange('0' + dayValue)
					else onDayChange('01')
				}
			},
		}

		return (
			<div className={$.dayInput}>
				<InputField { ...propsDayInputField }/>
			</div>
		)
	}

	_renderMonthInputField () {
		const {
			$,
			l,
			monthValue,
			focusedInput,
			withoutDay,
			onMonthChange,
			onYearChange,
			setFocusedInput
		} = this.props

		const isMonthMatchedMask = (value) => (
			value.match(/(?:^0[1-9]?$)|(?:^1[0-2]?$)/)
		)
		const checkMonthInput = (value) => {
			if (!value.match(/^\d*$/)) return

			if (value.length <= 0 || isMonthMatchedMask(value)) {
				onMonthChange(value)
				if (value.length === 2) setFocusedInput('YearInput')
			}
			else if (value.length === 1) {
				onMonthChange('0' + value)
				setFocusedInput('YearInput')
			}
			else if (value.length === 2) {
				const valueNum = parseInt(value)
				let newValue = ''
				if (valueNum < 1) newValue = '01'
				else if (valueNum > 12) newValue = '12'
				onMonthChange(newValue)
				setFocusedInput('YearInput')
			}
			else {
				onMonthChange(value.slice(0, 2))
				onYearChange(value.slice(2, 3))
				setFocusedInput('YearInput')
			}
		}

		const propsMonthInputField = {
			value: monthValue,
			placeholder: l('мм'),
			isFocused: focusedInput === 'MonthInput',
			onClick: () => setFocusedInput('MonthInput'),
			onChange: checkMonthInput,
			onKeyDown: (e) => {
				if (e.key === 'Tab') {
					if (e.shiftKey && !withoutDay) {
						e.preventDefault()
						setFocusedInput('DayInput')
					}
					else if (!e.shiftKey) {
						e.preventDefault()
						setFocusedInput('YearInput')
					}
				}
			},
			onBlur: () => {
				if (monthValue.length === 1) {
					const valueNum = parseInt(monthValue)
					if (valueNum) onMonthChange('0' + monthValue)
					else onMonthChange('01')
				}
			},
		}

		const style = { padding: withoutDay && 8 }

		return (
			<div className={$.monthInput} style={style}>
				<InputField { ...propsMonthInputField }/>
			</div>
		)
	}

	_renderYearInputField () {
		const {
			$,
			l,
			yearValue,
			focusedInput,
			withoutDay,
			onYearChange,
			setFocusedInput,
			isShortYearFormat
		} = this.props

		const isYearMatchedMask = (value) => (
			isShortYearFormat
				? value.match(/^\d{0,2}$/)
				: value.match(/^[1-9]\d?\d?\d?$/)
		)
		const checkYearInput = (value) => {
			if (!value.match(/^\d*$/)) return

			if (value.length <= 0 || isYearMatchedMask(value)) {
				onYearChange(value)
			}
		}

		const propsYearInputField = {
			value: yearValue,
			placeholder: isShortYearFormat ? l('гг') : l('гггг'),
			isFocused: focusedInput === 'YearInput',
			onClick: () => setFocusedInput('YearInput'),
			onChange: checkYearInput,
			onKeyDown: (e) => {
				if (e.key === 'Tab' && e.shiftKey) {
					e.preventDefault()
					setFocusedInput('MonthInput')
				}
			},
		}

		const style = { padding: withoutDay && 8 }

		return (
			<div className={$.yearInput} style={style}>
				<InputField { ...propsYearInputField }/>
			</div>
		)
	}

	render () {

		const { $, withoutDay, onBlur, onClick } = this.props

		const isInnerBlur = (inputsNode, relatedTarget) => {
			let el = relatedTarget
			while (el.parentElement !== document.body) {
				if (el.parentElement === inputsNode) return true
				el = el.parentElement
			}
			return false
		}
		const onBlurWrapper = (e) => {
			if (e.relatedTarget && isInnerBlur(this.refs.inputsNode, e.relatedTarget)) return

			onBlur()
		}

		return (
			<div className={$.inputsWrapper} onClick={onClick} tabIndex={1} onBlur={onBlurWrapper} ref='inputsNode'>
				{withoutDay ? null : this._renderDayInputField()}
				{this._renderMonthInputField()}
				{this._renderYearInputField()}
			</div>
		)
	}
}

export default enhancer(DateInputField)
