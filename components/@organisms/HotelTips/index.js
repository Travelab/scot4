import { compose, injectStyle } from '@utils/decoract'

import HotelRating from '@atoms/HotelRating'
import HotelDistance from '@atoms/HotelDistance'
import HotelCommentsCounter from '@atoms/HotelCommentsCounter'
import HotelFares from '@molecules/HotelFares'
import style from './styles/index'

const enhancer = compose(
	injectStyle(style()),
)

const HotelTips = ({ $, ...props }) => {

	const { rating, distance, commentsCount, roomsCount, refundable } = props

	return (
		<div className={$.tipsPanel}>
			<HotelRating rating={rating}/>
			<HotelDistance distance={distance}/>
			<HotelCommentsCounter commentsCount={commentsCount}/>
			<HotelFares refundable={refundable} roomsCount={roomsCount}/>
		</div>
	)
}

export default enhancer(HotelTips)
