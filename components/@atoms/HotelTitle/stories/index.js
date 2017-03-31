import { storiesOf, action } from '@kadira/storybook'

import HotelTitle from '../index.js'

storiesOf('HotelTitle', module)
	.add('default', () => (
		<HotelTitle title='Hotel Montmartre Deluxe Beausejour'/>
	))
