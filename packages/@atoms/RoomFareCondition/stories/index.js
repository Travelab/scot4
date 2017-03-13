import { storiesOf, action } from '@kadira/storybook'

import RoomFareCondition from '../index.js'

storiesOf('RoomFareCondition', module)
	.add('default', () => (
		<RoomFareCondition refundable={true}/>
	))
