import { storiesOf, action } from '@kadira/storybook'

import SerpOfferInfo from '../index.js'

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

const offer = {
	amenities,
	rating: 9.3,
	distance: 1.3,
	commentsCount: 12,
	roomsCount: 1,
	refundable: true,
	stars: true,
	hotelName: 'Hotel Montmartre Deluxe Beausejour',
	mealType: 'AI',
	price: 28538,
	currency: 'RUB',
	consist: [2, 0, 0]
}

const props = {
	offer,
	isActive: false
}

storiesOf('SerpOfferInfo', module)
	.add('default', () => (
		<SerpOfferInfo {...props}/>
	))
	.add('active', () => (
		<SerpOfferInfo {...props} isActive={true}/>
	))
	.add('mobile style', () => (
		<div style={{ padding: '10px', backgroundColor: '#ccc' }}>
			<SerpOfferInfo {...props} isActive={true}/>
		</div>
	))
	.add('mobile style (320px)', () => (
		<div style={{ padding: '10px', backgroundColor: '#ccc', width: '320px' }}>
			<SerpOfferInfo {...props} isActive={true}/>
		</div>
	))
