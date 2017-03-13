import { reduce } from 'lodash'
import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import OfferLinker from '@atoms/OfferLinker'
import style from './styles'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style()),
)

const SerpOfferBtn = ({ l, $, ...props }) => {

	const { offerId, isActive, showMore } = props

	if (!isActive && !showMore) return null

	let txtBtn = l('Посмотреть номера и забронировать')
	let btnClass = isActive ? $.activeBtn : $.btn

	if (showMore) {
		txtBtn = l('Посмотреть подробнее')
		btnClass = $.moreBtn
	}

	return (
		<OfferLinker offerId={offerId}>
			<div className={btnClass}>
				{txtBtn}
			</div>
		</OfferLinker>
	)
}

export default enhancer(SerpOfferBtn)
