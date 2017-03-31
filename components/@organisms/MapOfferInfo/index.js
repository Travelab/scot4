import { compose, injectStyle, connectLangWithoutDuck } from '@utils/decoract'

import SerpOfferBtn from '@atoms/SerpOfferBtn'
import HotelStars from '@molecules/HotelStars'
import ConciseHotelInfo from '@organisms/ConciseHotelInfo'

import style from './styles'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style())
)

const MapOfferInfo = ({ l, $, ...props }) => {

	const { title, stars, rating, mealType, price, currency, images, offerId } = props

	const formatedPrice = l.currency(price, currency)

	const propsConciseHotelInfo = {
		stars,
		title,
		mealType,
		rating,
		colorScheme: 'dark'
	}

	let renderedImages = null
	if (images && images.length) {
		const imgs = images.slice(0, 2).map((img, idx) =>
			<img src={img} key={idx}/>
		)
		renderedImages = (
			<div className={$.images}>
				{imgs}
			</div>
		)
	}

	return (
		<div className={$.container}>
			<div className={$.pad}>
				<ConciseHotelInfo {...propsConciseHotelInfo}/>
				<div className={$.price}>{formatedPrice}</div>
			</div>
			{renderedImages}
			<SerpOfferBtn offerId={offerId} showMore={true}/>
		</div>
	)
}

export default enhancer(MapOfferInfo)
