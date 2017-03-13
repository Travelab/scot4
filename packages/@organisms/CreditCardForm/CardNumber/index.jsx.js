import { createEnhancer } from '@utils/decoract'

import InputField from '@atoms/InputField'
import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import FormField from '@molecules/FormField'

import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const CardNumber = ({ $, l, ...props }) => {

	const {
		value,
		documentType,
		isTouched,
		isValid,
		errorMsg,
		t414,
		onBlur,
		onClick,
		onChange
	} = props

	const label = (
		<div className={$.label}>
			{l('Номер карты ')}
			<span>{l('(16 цифр)')}</span>
		</div>
	)

	const isValueMatchedMask = (value) => (
		value.match(/(?:^\d{0,4}$)|(?:^\d{4} \d{0,4}$)|(?:^\d{4} \d{4} \d{0,4}$)|(?:^\d{4} \d{4} \d{4} \d{0,4}$)/)
	)
	const checkValueInput = (value) => {

		if (isValueMatchedMask(value)) {
			onChange(value)
		}
		else if (value.length === 16) {
			const newValue = value.slice(0, 4) + ' ' + value.slice(4, 8) + ' ' + value.slice(8, 12) + ' ' + value.slice(12)
			if (isValueMatchedMask(newValue)) onChange(newValue)
		}
		else if (value.length >= 5 && value.length < 10) {
			const newValue = value.slice(0, 4) + ' ' + value.slice(4)
			if (isValueMatchedMask(newValue)) onChange(newValue)
		}
		else if (value.length >= 10 && value.length < 15) {
			const newValue = value.slice(0, 9) + ' ' + value.slice(9)
			if (isValueMatchedMask(newValue)) onChange(newValue)
		}
		else if (value.length >= 15 && value.length < 20) {
			const newValue = value.slice(0, 14) + ' ' + value.slice(14)
			if (isValueMatchedMask(newValue)) onChange(newValue)
		}
	}

	const propsInputField = {
		value,
		placeholder: l('0000 0000 0000 0000'),
		onClick,
		onBlur,
		onChange: checkValueInput,
		onKeyDown: () => {},
	}

	const propsValidationFieldWrapper = {
		isTouched,
		isInvalid: !isValid,
		errorMsg,
		withoutMsg: t414
	}

	return (
		<div className={$.container}>
			<FormField label={label}>
				<ValidationFieldWrapper { ...propsValidationFieldWrapper }>
					<div className={$.inputWrapper}>
						<InputField { ...propsInputField } />
					</div>
				</ValidationFieldWrapper>
			</FormField>
		</div>
	)
}

export default enhancer(CardNumber)
