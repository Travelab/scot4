import { storiesOf, action } from '@kadira/storybook'

import HotelTips from '../index.js'

const props = {
	rating: 8.5,
	distance: 1.3,
	commentsCount: 12,
	roomsCount: 1,
	refundable: true
}

storiesOf('HotelTips', module)
	.add('default', () => (
		<HotelTips {...props}/>
	))
