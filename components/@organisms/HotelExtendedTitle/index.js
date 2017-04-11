import { compose, injectStyle } from '@utils/decoract'

import HotelTitle from '@atoms/HotelTitle'
import HotelQuality from '@molecules/HotelQuality'
import style from './styles/index'

const enhancer = compose(
	injectStyle(style),
)

const HotelExtendedTitle = ({ $, ...props }) => {

	const { stars, title, mealType } = props

	return (
		<div>
			<HotelQuality stars={stars} mealType={mealType}/>
			<HotelTitle title={title}/>
		</div>
	)
}

export default enhancer(HotelExtendedTitle)
