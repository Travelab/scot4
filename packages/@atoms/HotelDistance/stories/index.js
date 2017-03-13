import { storiesOf, action } from '@kadira/storybook'

import HotelDistance from '../index.js'

storiesOf('HotelDistance', module)
	.add('default', () => (
		<HotelDistance distance={1.3}/>
	))
