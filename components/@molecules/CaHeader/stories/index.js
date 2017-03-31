import { storiesOf, action } from '@kadira/storybook'

import CaHeader from '../index.js'

storiesOf('CaHeader', module)
	.add('default', () => (
		<CaHeader channel='aviasales'/>
	))
