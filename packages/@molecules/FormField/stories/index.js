import { storiesOf, action } from '@kadira/storybook'

import ValidationFieldWrapper from '@atoms/ValidationFieldWrapper'
import InputField from '@atoms/InputField'
import FormField from '../index.js'

storiesOf('FormField', module)
	.add('Surname field', () => (
		<FormField label='ФАМИЛИЯ'>
			<ValidationFieldWrapper>
				<InputField placeholder='латинскими буквами'/>
			</ValidationFieldWrapper>
		</FormField>
	))
