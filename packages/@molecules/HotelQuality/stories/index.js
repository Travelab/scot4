import { storiesOf, action } from '@kadira/storybook'

import HotelQuality from '../index.js'

storiesOf('HotelQuality', module)
	.add('default', () => (
		<div style={{ padding: '10px', backgroundColor: '#ccc' }}>
			<HotelQuality stars={3} mealType='AI'/>
		</div>
	))
