import { storiesOf, action } from '@kadira/storybook'

import TravelabMainPage from '../index.js'

storiesOf('TravelabMainPage', module)
	.add('default', () => (
		<TravelabMainPage/>
	))