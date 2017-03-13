import { storiesOf, action } from '@kadira/storybook'

import CaConsistSelector from '../index.js'

const propsConsistSelector = {
	adults: {
		value: 1,
		onIncrement: action('adding adults'),
		onDecrement: action('removing adults')
	},
	children: {
		value: 3,
		onIncrement: action('adding children'),
		onDecrement: action('removing children')
	},
	infants: {
		value: 4,
		onIncrement: action('adding infants'),
		onDecrement: action('removing infants')
	},
	onConfirm: action('confirmed')
}

storiesOf('CaConsistSelector', module)
	.add('default', () => (
		<div style={{width: 280, background: 'radial-gradient(circle at 50% 50%, #ffffff, #a2adaf)'}}>
			<CaConsistSelector { ...propsConsistSelector } />
		</div>
	))
