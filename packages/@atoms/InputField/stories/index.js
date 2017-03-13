import { storiesOf, action } from '@kadira/storybook'

import InputField from '../index.js'

storiesOf('InputField', module)
	.add('default', () => (
		<InputField/>
	))
