import IIDetector from '@utils/ii-detector'
import { createEnhancer } from '@utils/decoract'

import HotelGallery from '@molecules/HotelGallery'
import SerpOfferInfo from '@organisms/SerpOfferInfo'

import duck from './ducks/index'
import style from './styles/index'

const cq = {
	t414: {
		maxWidth: 414,
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	style: style(),
	withLang: false
})

const SerpOffer = ({ $, state, actions, ditch, cq, ...props }) => {
	const { t414 } = cq
	const { offer } = props
	const { images } = offer
	const { isActive } = state
	const { hotelGallery } = ditch.getDitches()

	let infoContainer = null
	const propsSerpOfferInfo = { offer, isActive }

	const { mouseEnter, mouseLeave } = actions
	const onMouseEnter = () => mouseEnter(offer.id)
	const onMouseLeave = () => mouseLeave(null)
	const propsContainer = { onMouseEnter, onMouseLeave }

	if (t414) {
		propsSerpOfferInfo.fullScreen =  true

		return (
			<div className={$.narrowContainer} {...propsContainer}>
				<HotelGallery images={images} ditch={hotelGallery} overlay={true}/>
				<div className={$.wrap}>
					<SerpOfferInfo {...propsSerpOfferInfo}/>
				</div>
			</div>
		)
	}
	else {
		return (
			<div className={$.container} {...propsContainer}>
				<div className={$.gallery}>
					<HotelGallery images={images} ditch={hotelGallery}/>
				</div>
				<div className={$.info}>
					<SerpOfferInfo {...propsSerpOfferInfo}/>
				</div>
			</div>
		)
	}

}

export default enhancer(SerpOffer)
