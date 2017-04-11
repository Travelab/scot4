import { createEnhancer } from '@utils/decoract'

import HotelExtendedTitle from '@organisms/HotelExtendedTitle'
import HotelAmenities from '@molecules/HotelAmenities'

import HotelRating from '@atoms/HotelRating'
import HotelQuality from '@molecules/HotelQuality'
import HotelTitle from '@atoms/HotelTitle'
import SerpOfferPrice from '@atoms/SerpOfferPrice'
import style from './styles/index'

const enhancer = createEnhancer({
	style: style(),
	withLang: false
})

const ConciseHotelInfo = ({ $, ...props }) => {

	const { stars, title, mealType, amenities, rating, price, currency, colorScheme, wideStyle } = props

	if (wideStyle || !amenities) {
		const renderedRating = <HotelRating rating={rating} square={true} colorScheme={colorScheme}/>

		return (
			<div className={$.mobileContainer}>
				{renderedRating}
				{renderedRating && <div className={$.spacer}/>}
				<div className={$.data}>
					<div className={$.row}>
						<HotelQuality stars={stars} mealType={mealType} colorScheme={colorScheme}/>
					</div>
					<div className={$.row}>
						<HotelTitle title={title}/>
						{!!price && <SerpOfferPrice {...{ price, currency }}/>}
					</div>
				</div>
			</div>
		)
	}
	else {
		return (
			<div className={$.container}>
				<HotelExtendedTitle {...{stars, title, mealType}}/>
				<HotelAmenities amenities={amenities}/>
			</div>
		)
	}
}

export default enhancer(ConciseHotelInfo)
