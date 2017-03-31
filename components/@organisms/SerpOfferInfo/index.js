import { createEnhancer } from '@utils/decoract'

import SerpOfferControls from '@molecules/SerpOfferControls'
import ConciseHotelInfo from '@organisms/ConciseHotelInfo'
import HotelTips from '@organisms/HotelTips'
import OfferLinker from '@atoms/OfferLinker'
import style from './styles'

const enhancer = createEnhancer({
	style: style(),
	withLang: false
})

const SerpOfferInfo = ({ $, ...props }) => {
	const { offer, isActive, fullScreen } = props

	const {
		rating,
		distance,
		commentsCount,
		roomsCount,
		refundable,
		stars,
		hotelName,
		mealType,
		amenities,
		price,
		currency,
		consist
	} = offer

	const propsConciseHotelInfo = {
		stars,
		rating,
		mealType,
		amenities,
		title: hotelName
	}

	if (fullScreen) {
		const propsExtendedCHI = {
			price,
			currency,
			wideStyle: true,
			colorScheme: 'light',
			...propsConciseHotelInfo
		}

		return (
			<div className={$.mobileContainer}>
				<OfferLinker offerId={offer.id}>
					<div className={$.mobileActiveZone}>
						<ConciseHotelInfo {...propsExtendedCHI}/>
					</div>
				</OfferLinker>
			</div>
		)
	}
	else {
		const propsSerpOfferControls = {
			price,
			currency,
			consist,
			isActive,
			offerId: offer.id
		}

		const propsHotelTips = {
			rating,
			distance,
			commentsCount,
			roomsCount,
			refundable
		}

		return (
			<div className={$.container}>
				<div className={$.row}>
					<div className={$.chi}>
						<ConciseHotelInfo {...propsConciseHotelInfo}/>
					</div>
					<SerpOfferControls {...propsSerpOfferControls}/>
				</div>
				<HotelTips {...propsHotelTips}/>
			</div>
		)
	}
}

export default enhancer(SerpOfferInfo)
