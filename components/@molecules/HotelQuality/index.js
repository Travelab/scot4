import { createEnhancer } from '@utils/decoract'

import HotelStars from '@molecules/HotelStars'
import RoomMealType from '@atoms/RoomMealType'
import style from './styles/index'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const HotelQuality = ({ $, ...props }) => {

	const { stars, mealType, colorScheme } = props
	const needSpace = !!stars

	return (
		<div className={$.container}>
			<HotelStars stars={stars} colorScheme={colorScheme}/>
			{needSpace && <div className={$.space}/>}
			<RoomMealType mealType={mealType} colorScheme={colorScheme}/>
		</div>
	)
}

export default enhancer(HotelQuality)
