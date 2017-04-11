import { range } from 'lodash'
import { storiesOf, action } from '@kadira/storybook'
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'

import duck from '../ducks/index'
import TravelabMap from '../index.js'

const containerStyles = { width: 500, height: 400 }

const containerDecorator = (getStory) => {

	return (
		<div style={containerStyles}>
			{getStory()}
		</div>
	)
}

const mapCenter = { lat: 59.938043, lng: 30.337157 }
const offer = {
	price: 10500,
	currency: 'RUB',
	stars: 2,
	hotel_name: 'Test Hotel'
}

const modifier = 20
const markers = range(50).map((idx) => {
	let id = `idOffer${idx}`
	let sign = Math.random() > 0.5 ? 1 : -1
	return {
		...offer,
		id: id,
		location: [
			59.934012 + sign * Math.random() / modifier,
			30.382136 + sign * Math.random() / modifier
		]
	}
})

storiesOf('TravelabMap', module)
	.addDecorator(createReduxSagaDecorator(duck))
	.addDecorator(containerDecorator)
	.add('default', () => (
		<TravelabMap center={mapCenter}/>
	))
	.add('with markers', () => (
		<TravelabMap center={mapCenter} markers={markers}/>
	))
	.add('with an active marker', () => {
		const props = {
			markers,
			center: mapCenter,
			activeOfferId: markers[0].id
		}

		return <TravelabMap {...props}/>
	})
