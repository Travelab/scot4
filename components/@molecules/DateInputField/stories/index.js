import { storiesOf, action } from '@kadira/storybook'

import DateInputField from '../index.js'

storiesOf('DateInputField', module)
	.add('default', () => (
		<DateInputField/>
	))