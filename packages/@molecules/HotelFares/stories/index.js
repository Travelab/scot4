import { storiesOf, action } from '@kadira/storybook'

import HotelFares from '../index.js'

storiesOf('HotelFares', module)
	.add('default', () => (
		<HotelFares roomsCount={1} refundable={true}/>
	))
