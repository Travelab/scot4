import { storiesOf, action } from '@kadira/storybook'

import Togliatti from '../index.js'

storiesOf('Togliatti', module)
	.add('default', () => (
		<Togliatti/>
	))