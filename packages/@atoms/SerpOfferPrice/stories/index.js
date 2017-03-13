import { storiesOf, action } from '@kadira/storybook'

import SerpOfferPrice from '../index.js'

storiesOf('SerpOfferPrice', module)
	.add('default', () => (
		<SerpOfferPrice price={10500} currency='RUB' consist={[1, 0, 0]}/>
	))
	.add('in USD', () => (
		<SerpOfferPrice price={600} currency='USD' consist={[1, 1, 0]}/>
	))
	.add('actvie', () => (
		<div style={{ backgroundColor: '#ccc' }}>
			<SerpOfferPrice price={10500} currency='RUB' consist={[1, 0, 0]} isActive={true}/>
		</div>
	))

