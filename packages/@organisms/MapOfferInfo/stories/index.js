import { storiesOf, action } from '@kadira/storybook'

import MapOfferInfo from '../index.js'


const decorator = (getStory) => {
	return (
		<div style={{ padding: '10px', backgroundColor: '#ccc' }}>
			{getStory()}
		</div>
	)
}

const offer = {
	title: 'Test Hotel',
	price: 10500,
	currency: 'RUB'
}

storiesOf('MapOfferInfo', module)
	.addDecorator(decorator)
	.add('default', () => (
		<MapOfferInfo {...offer}/>
	))
	.add('with stars', () => (
		<MapOfferInfo {...{ ...offer, stars: 3 }}/>
	))
