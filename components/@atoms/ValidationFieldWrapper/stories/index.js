import { storiesOf, action } from '@kadira/storybook'

import InputField from '@atoms/InputField'
import ValidationFieldWrapper from '../index.js'

const propsInputField = {
	value: 'Aasdqwe',
	notRenderClearIcon: true
}

storiesOf('ValidationFieldWrapper', module)
	.add('default', () => (
		<ValidationFieldWrapper>
			<InputField placeholder='surname' />
		</ValidationFieldWrapper>
	))
	.add('invalid', () => (
		<ValidationFieldWrapper isTouched isInvalid errorMsg='Very very long error message'>
			<InputField { ...propsInputField } />
		</ValidationFieldWrapper>
	))
	.add('valid', () => (
		<ValidationFieldWrapper isTouched >
			<InputField { ...propsInputField } />
		</ValidationFieldWrapper>
	))
