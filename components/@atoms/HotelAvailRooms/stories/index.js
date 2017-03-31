import { storiesOf, action } from '@kadira/storybook'

import HotelAvailRooms from '../index.js'

storiesOf('HotelAvailRooms', module)
	.add('1 avail room', () => (
		<HotelAvailRooms roomsCount={1}/>
	))
	.add('2 avail rooms', () => (
		<HotelAvailRooms roomsCount={2}/>
	))
	.add('5 avail rooms', () => (
		<HotelAvailRooms roomsCount={5}/>
	))
	.add('no avail rooms', () => (
		<HotelAvailRooms roomsCount={0}/>
	))
