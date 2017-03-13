import { storiesOf, action } from '@kadira/storybook'

import ConciseHotelInfo from '../index.js'

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

const props = {
	amenities,
	stars: 3,
	mealType: 'AI',
	title: 'Hotel Montmartre Deluxe Beausejour',
	rating: 8.5
}

storiesOf('ConciseHotelInfo', module)
	.add('default', () => (
		<ConciseHotelInfo {...props}/>
	))
	.add('mobile style', () => (
		<div style={{ padding: '10px', backgroundColor: '#ccc' }}>
			<ConciseHotelInfo {...props}/>
		</div>
	))
