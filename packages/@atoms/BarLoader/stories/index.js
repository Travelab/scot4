import { storiesOf, action } from '@kadira/storybook'

import BarLoader from '../index.js'

storiesOf('BarLoader', module)
	.add('default', () => (
		<BarLoader />
	))
