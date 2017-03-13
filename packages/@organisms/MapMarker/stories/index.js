import { storiesOf, action } from '@kadira/storybook'

import MapMarker from '../index.js'
import hotel1 from '@libs/offer-mock/hotel1.png'
import hotel2 from '@libs/offer-mock/hotel2.png'

const containerStyle = {
	width: 500,
	height: 500,
	padding: '30px 0 30px 150px',
	backgroundColor: '#ccc'
}

const decorator = (getStory) => {
	return (
		<div style={containerStyle}>
			{getStory()}
		</div>
	)
}

const offer = {
	id: 'offer001',
	price: 10500,
	currency: 'RUB',
	hotelName: 'Test Hotel Long Long Title',
	stars: 2,
	rating: 8.5,
	mealType: 'AI',
	images: [ hotel1, hotel2 ]
}

storiesOf('MapMarker', module)
	.addDecorator(decorator)
	.add('default', () => (
		<MapMarker offer={offer}/>
	))
	.add('active', () => (
		<MapMarker offer={offer} isActive={true}/>
	))
	.add('default with tooltip', () => (
		<MapMarker offer={offer} isOpened={true}/>
	))
	.add('active with tooltip', () => (
		<MapMarker offer={offer} isOpened={true} isActive={true}/>
	))
