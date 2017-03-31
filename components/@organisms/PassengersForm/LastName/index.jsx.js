import { createEnhancer } from '@utils/decoract'

import InputField from '@atoms/InputField'
import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import FormField from '@molecules/FormField'

import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const LastName = ({ $, l, ...props }) => {

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

	const label = <div className={!t414 ? $.label : null}>{l('Фамилия')}</div>

	const propsInputField = {
		value,
		placeholder: l('латинскими буквами'),
		onClick,
		onBlur,
		onChange: (val) => onChange(val.toUpperCase()),
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

export default enhancer(LastName)
