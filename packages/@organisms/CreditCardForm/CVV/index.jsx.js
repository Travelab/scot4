import { createEnhancer } from '@utils/decoract'

import InputField from '@atoms/InputField'
import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import FormField from '@molecules/FormField'

import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const CVV = ({ $, l, ...props }) => {

	const {
		value,
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
			{l('CVV ')}
			<span>{l('(3 цифры)')}</span>
		</div>
	)

	const isValueMatchedMask = (value) => (
		value.match(/^\d{0,3}$/)
	)
	const checkValueInput = (value) => {
		if (isValueMatchedMask(value)) {
			onChange(value)
		}
	}

	const propsInputField = {
		value,
		placeholder: l('000'),
		type: 'password',
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

export default enhancer(CVV)
