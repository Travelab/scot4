import CaSerpOffer from '@organisms/CaSerpOffer'
import LoadingSpinner from '@atoms/LoadingSpinner'
import obc from '@libs/obc'
import { createEnhancer } from '@utils/decoract'

import duck from './ducks/index.js'
import style from './styles/index.js'


const { STOP_LOADING, DATA_LOADED } = obc

const cq = {
	t999: {
		maxWidth: 999,
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	args: {
		paginator: obc.paginator,
	},
	style,
})

const CaSerpOffersList = ({ $, cq, l, state, actions, args }) => {

	const { t999 } = cq

	const { paginator } = args

	const offers = paginator.items

	const { dbStatus } = state

	if (!offers.length) {
		if (!dbStatus) {
			return null
		} 
		else if (dbStatus === STOP_LOADING || dbStatus === DATA_LOADED) {
			const txtNotFound = l('Ничего не найдено')

			return <div className={$.container}>{txtNotFound}</div>
		}
	}

	const content = offers.map((offer, i) => (
		<div key={offer.id} className={$.column}>
			<CaSerpOffer offer={offer} mobile={t999}/>
		</div>
	))
	
	const loader = (
		<div className={$.loadingWrapper}>
			{dbStatus !== DATA_LOADED && <LoadingSpinner clickaviaStyle/>}
		</div>
	)

	return (
		<div className={t999 ? $.mobileContainer : $.container}>
			<div className={$.row}>
				{content}
			</div>
			{loader}
		</div>
	)
}

export default enhancer(CaSerpOffersList)
