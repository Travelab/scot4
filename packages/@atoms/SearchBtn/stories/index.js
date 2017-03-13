import { storiesOf, action } from '@kadira/storybook'

import Component from '../index.js'

storiesOf('Search button', module)
	.add('default', () => (
		<Component
			onClick={action('search button clicked')}
		/>
	))

