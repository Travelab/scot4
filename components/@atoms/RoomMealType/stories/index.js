import { storiesOf, action } from '@kadira/storybook'

import RoomMealType from '../index.js'

storiesOf('RoomMealType', module)
	.add('default', () => (
		<RoomMealType mealType='AI'/>
	))
	.add('no meal', () => (
		<RoomMealType mealType='RO'/>
	))
