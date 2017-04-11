import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import SerpOffer from '../index.js'
import duck from '../ducks/index'

import hotel1 from './hotel1.png'
import hotel2 from './hotel2.png'

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
	stars: 3,
	hotelName: 'Hotel Montmartre Deluxe Beausejour',
	mealType: 'AI',
	price: 28538,
	currency: 'RUB',
	consist: [2, 0, 0],
	images: [hotel1, hotel2]
}

const decorator = (getStory) => {
	return (
		<div style={{ backgroundColor: '#E3E3E3', padding: '25px' }}>
			{getStory()}
		</div>
	)
}

const mobileDecorator = (getStory) => {
	return (
		<div style={{ backgroundColor: '#E3E3E3', width: '320px' }}>
			{getStory()}
		</div>
	)
}

storiesOf('SerpOffer', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.addDecorator(mobileDecorator)
	.add('default', () => (
		<SerpOffer offer={offer}/>
	))
	.add('mobile style', () => (
		<SerpOffer offer={offer}/>
	))
