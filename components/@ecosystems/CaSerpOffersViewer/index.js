import { createEnhancer } from '@utils/decoract'

import duck from './ducks'
import style from './styles'

import CaSerpOffersList from '@organisms/CaSerpOffersList'
import OffersPaginate from '@molecules/OffersPaginate'
import OffersSortOptions from '@molecules/OffersSortOptions'

const enhancer = createEnhancer({
	duck,
	style,
	withLang: false,
})

const SerpOffersViewer = ({ $, state, ditch, ...props }) => {

	const { offersSortOptions, offersPaginate, caSerpOffersList } = ditch.getDitches()

	return (
		<div className={$.container}>
			<OffersSortOptions ditch={offersSortOptions}/>
			<CaSerpOffersList ditch={caSerpOffersList} />
			<OffersPaginate ditch={offersPaginate} />
		</div>
	)
}

export default enhancer(SerpOffersViewer)
