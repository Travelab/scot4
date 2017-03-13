import { storiesOf, action } from '@kadira/storybook'
import { decorateAction } from '@kadira/storybook-addon-actions'

import HotelStars from '@molecules/HotelStars'

const firstArgAction = decorateAction([ args => args.slice(0,1) ])

import Checkbox from '../index.js'

const items = [
	{
		label: <HotelStars stars={3}/>,
		checked: 'checked',
		disabled: '',
		note: 123,
		onChange: action('3 stars changed')
	},
	{
		label: <HotelStars stars={2}/>,
		checked: '',
		disabled: '',
		note: 45,
		onChange: action('2 stars changed')
	},
	{
		label: <HotelStars stars={1}/>,
		checked: '',
		disabled: '',
		note: 12,
		onChange: action('1 stars changed')
	}
]

storiesOf('Checkbox', module)
	.add('default', () => (
		<Checkbox
			items={items}
		/>
	))
