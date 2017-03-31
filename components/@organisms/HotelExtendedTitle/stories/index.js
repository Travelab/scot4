import { storiesOf, action } from '@kadira/storybook'

import HotelExtendedTitle from '../index.js'

storiesOf('HotelExtendedTitle', module)
	.add('default', () => (
		<HotelExtendedTitle mealType='AI' title='Hotel Montmartre Deluxe Beausejour'/>
	))
