import { sagaEffects } from '@libs/lash'

import sagaCaSerpOffersList from '@organisms/CaSerpOffersList/sagas'
import sagaOffersPaginate from '@molecules/OffersPaginate/sagas'
import sagaOffersSortOptions from '@molecules/OffersSortOptions/sagas'


const { fork } = sagaEffects


export default function* (ditch) {

	const { offersSortOptions, offersPaginate, caSerpOffersList, } = ditch.getDitches()

	yield [
		fork(sagaCaSerpOffersList, caSerpOffersList),
		fork(sagaOffersPaginate, offersPaginate),
		fork(sagaOffersSortOptions, offersSortOptions),
	]
}
