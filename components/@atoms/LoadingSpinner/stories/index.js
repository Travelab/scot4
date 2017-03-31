import { storiesOf, action } from '@kadira/storybook'

import LoadingSpinner from '../index.js'

storiesOf('LoadingSpinner', module)
	.add('default', () => (
		<LoadingSpinner/>
	))