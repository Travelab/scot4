import { storiesOf, action } from '@kadira/storybook'

import HotelStars from '../index.js'

storiesOf('HotelStars', module)
	.add('default', () => (
			<HotelStars stars={3}/>
	))
