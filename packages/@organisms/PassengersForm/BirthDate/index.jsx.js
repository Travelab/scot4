import { createEnhancer } from '@utils/decoract'

import DateInputField from '@molecules/DateInputField'
import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import FormField from '@molecules/FormField'

// import validationCheck from './validation.js'
import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const BirthDate = ({ $, l, ...props }) => {
	const {
		dayValue,
		monthValue,
		yearValue,
		isTouched,
		t414,
		isValid,
		errorMsg
	} = props

	const label = <div className={!t414 ? $.label : null}>{l('Дата рождения')}</div>

	// const { isInvalid, errorMsg } = validationCheck(dayValue, monthValue, yearValue)

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
					<DateInputField { ...props } />
				</ValidationFieldWrapper>
			</FormField>
		</div>
	)
}

export default enhancer(BirthDate)
