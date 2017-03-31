import { storiesOf, action } from '@kadira/storybook'

import SerpOfferControls from '../index.js'

const props = {
	price: 10500,
	currency: 'RUB',
	consist: [1, 0, 0],
	isActive: false
}
storiesOf('SerpOfferControls', module)
	.add('default', () => (
		<SerpOfferControls {...props}/>
	))
	.add('active', () => (
		<SerpOfferControls {...props} isActive={true}/>
	))
