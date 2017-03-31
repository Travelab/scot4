import { createEnhancer } from '@utils/decoract'

import DateInputField from '@molecules/DateInputField'
import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import FormField from '@molecules/FormField'

import style from './style.js'

const enhancer = createEnhancer({
	style,
})

const DocumentValidity = ({ $, l, ...props }) => {
	const { monthValue, yearValue, isTouched, isValid, errorMsg, t414 } = props

	const label = (
		<div className={$.label}>
			{l('Действует до')}
		</div>
	)

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
					<DateInputField { ...props } withoutDay isShortYearFormat/>
				</ValidationFieldWrapper>
			</FormField>
		</div>
	)
}

export default enhancer(DocumentValidity)
