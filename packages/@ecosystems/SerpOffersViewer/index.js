import { createEnhancer } from '@utils/decoract'

import duck from './ducks'
import style from './styles'

import OffersList from '@organisms/OffersList'
import OffersListHint from '@molecules/OffersListHint'
import OffersPaginate from '@molecules/OffersPaginate'
import OffersSortOptions from '@molecules/OffersSortOptions'

const enhancer = createEnhancer({
	duck,
	style: style(),
	withLang: false,
})

const SerpOffersViewer = ({ $, ditch, ...props }) => {

	const { offersSortOptions, offersPaginate, offersListHint, offersList } = ditch.getDitches()
	const { squareStyle } = props

	const sorting = (
		<OffersSortOptions ditch={offersSortOptions}/>
	)
	let hint = <OffersListHint ditch={offersListHint} cardStyle={squareStyle} margin={squareStyle}/>
	let pages = <OffersPaginate ditch={offersPaginate} twoStepMode={squareStyle}/>
	if (squareStyle) {
		hint = <div className={$.hint}>{hint}</div>
		pages = <div className={$.pagesWrap}>{pages}</div>
	}

	return (
		<div className={$.container}>
			{!squareStyle && sorting}
			{hint}
			<OffersList ditch={offersList} squareStyle={squareStyle}/>
			{pages}
		</div>
	)
}

export default enhancer(SerpOffersViewer)
