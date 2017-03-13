import obc from '@libs/obc'
import { isEmpty, compact } from 'lodash'
import { createEnhancer } from '@utils/decoract'

import SerpOffer from '@organisms/SerpOffer'

import duck from './ducks'
import style from './styles'

const enhancer = createEnhancer({
	duck,
	style,
	args: {
		paginator: obc.paginator,
	},
	withLang: true,
})

const OffersList = ({ l, $, state, actions, ditch, args, ...props }) => {
	const { dbStatus } = state
	const { paginator } = args
	const { squareStyle } = props
	const offers = paginator.items

	const serpOffersDitch = ditch.getDitch('serpOffers')

	if (isEmpty(offers)) {
		if (!dbStatus) {
			return null
		}
		else if (dbStatus === obc.STOP_LOADING || dbStatus === obc.DATA_LOADED) {
			const txtNotFound = l('Ничего не найдено')

			return <div className={$.container}>{txtNotFound}</div>
		}
	}

	const serpOffersState = serpOffersDitch.getState(state)
	const content = compact(offers.map(
		(offer) => {
			const { id } = offer
			if (serpOffersState && serpOffersState[id]) {
				const offerDitch = serpOffersDitch.getDitch(id)
				return <SerpOffer offer={offer} key={id} ditch={offerDitch}/>
			}
			else return null
		}
	))

	return (
		<div className={squareStyle ? $.mobileContainer : $.container }>
			{content}
		</div>
	)
}

export default enhancer(OffersList)
