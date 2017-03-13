import { createEnhancer } from '@utils/decoract'

import InputField from '@atoms/InputField'
import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import FormField from '@molecules/FormField'

import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const DocumentNumber = ({ $, l, ...props }) => {

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

	const label = <div className={!t414 ? $.label : null}>{l('Серия и № документа')}</div>

	// if need mask and pipes uncomment code
	/*const isValueMatchedMask = (value) => (
		value.match(/(?:^\d{0,2}$)|(?:^\d{0,2} \d{0,7}$)/)
	)
	const checkValueInput = (value) => {

		if (isValueMatchedMask(value)) {
			onChange(value)
		}
		else if (value.length >= 3 && value.length < 10) {
			const newValue = value.slice(0, 2) + ' ' + value.slice(2,)
			if (isValueMatchedMask(newValue)) onChange(newValue)
		}
	}*/

	let placeholder = ''
	if (documentType === 'national-passport') {
		placeholder = l('0000 000000')
	}
	else if (documentType === 'travel-passport') {
		placeholder = l('00 0000000')
	}
	else if (documentType === 'birth-certificate') {
		placeholder = l('XX-XX 000000')
	}

	const propsInputField = {
		value,
		placeholder,
		onClick,
		onBlur,
		onChange: onChange,
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

export default enhancer(DocumentNumber)
