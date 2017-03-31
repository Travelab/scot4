import { compose, injectStyle } from '@utils/decoract'

import SerpOfferPrice from '@atoms/SerpOfferPrice'
import SerpOfferBtn from '@atoms/SerpOfferBtn'
import style from './styles'

const enhancer = compose(
	injectStyle(style()),
)

const SerpOfferControls = ({ $, ...props }) => {

	const { offerId, isActive } = props

	return (
		<div className={isActive ? $.activeContainer : $.container}>
			<SerpOfferPrice {...props} extView={true}/>
			<SerpOfferBtn isActive={isActive} offerId={offerId}/>
		</div>
	)
}

export default enhancer(SerpOfferControls)
