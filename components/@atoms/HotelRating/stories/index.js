import { storiesOf, action } from '@kadira/storybook'

import HotelRating from '../index.js'

storiesOf('HotelRating', module)
	.add('default', () => (
		<HotelRating rating={8.5}/>
	))
	.add('low rating', () => (
		<HotelRating rating={4.5}/>
	))
	.add('square style', () => (
		<div style={{ padding: '10px', backgroundColor: '#ccc' }}>
			<HotelRating rating={8.5} square={true}/>
		</div>
	))
