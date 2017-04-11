import Isvg from 'react-inlinesvg'
import { compose, injectStyle } from '@utils/decoract'

import MapPin from '@atoms/MapPin'
import MapOfferInfo from '@organisms/MapOfferInfo'

import style from './styles/index'
import crossImg from './images/cross.svg'

const enhancer = compose(
	injectStyle(style())
)

const MapMarker = ({ $, ...props }) => {

	const { offer, isActive, isOpened, onToggleBalloon } = props

	const onClickHandler = () => {
		onToggleBalloon({ id: offer.id })
	}

	const renderBalloon = () => {

		const propsMapOffer = {
			key: offer.id,
			offerId: offer.id,
			title: offer.hotelName,
			stars: offer.stars,
			rating: offer.rating,
			mealType: offer.mealType,
			price: offer.price,
			currency: offer.currency,
			images: offer.images
		}

		return (
			<div className={isActive ? $.activeTooltipContent : $.tooltipContent}>
				<MapOfferInfo {...propsMapOffer}/>
				<span className={$.crossContainer} onClick={onClickHandler}>
					<Isvg className={$.cross} src={crossImg}/>
				</span>
			</div>
		)
	}


	return (
		<div>
			<MapPin isActive={isActive} onClick={onClickHandler}/>
			{isOpened && renderBalloon()}
		</div>
	)

}

export default enhancer(MapMarker)
