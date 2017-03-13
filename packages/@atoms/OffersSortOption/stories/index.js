import { storiesOf, action } from '@kadira/storybook'

import OffersSortOption from '../index.js'

const props = {
	optionKey: 'priceAsc',
	title: 'Сначала дешевые',
	onClick: (key) => alert(`Set sort: ${key}`)
}

storiesOf('OffersSortOption', module)
	.add('default', () => (
		<OffersSortOption {...props}/>
	))
	.add('active', () => (
		<OffersSortOption {...props} isActive={true}/>
	))
