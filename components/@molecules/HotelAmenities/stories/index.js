import { storiesOf, action } from '@kadira/storybook'

import HotelAmenities from '../index.js'

const amenities = [
	'swimmingPool',
	'sandyBeach',
	'childrensPlayground',
	'playroom',
	'childrenSwimmingPool',
	'waterPark',
	'spa',
	'freeParking',
	'airConditioning',
	'freeWifi',
]

storiesOf('HotelAmenities', module)
	.add('default', () => (
		<HotelAmenities amenities={amenities}/>
	))
