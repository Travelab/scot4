import { storiesOf, action } from '@kadira/storybook'

import Dropdown from '../index.js'

storiesOf('Dropdown', module)
	.add('default', () => (
		<Dropdown/>
	))