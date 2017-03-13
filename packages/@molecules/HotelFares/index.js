import { compose, injectStyle } from '@utils/decoract'

import HotelAvailRooms from '@atoms/HotelAvailRooms'
import RoomFareCondition from '@atoms/RoomFareCondition'
import style from './styles'

const enhancer = compose(
	injectStyle(style),
)

const HotelFares = ({ $, ...props }) => {

	const { roomsCount, refundable } = props
	return (
		<div>
			<RoomFareCondition refundable={refundable}/>
			<HotelAvailRooms roomsCount={roomsCount}/>
		</div>
	)
}

export default enhancer(HotelFares)
