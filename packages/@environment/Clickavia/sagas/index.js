import { saga, sagaEffects } from '@libs/lash'
const { fork } = sagaEffects

import checkoutPageSaga from '@ecosystems/CaCheckoutPage/sagas'

export default function* (ditch) {
	const { checkoutPageDitch } = ditch.getDitches()

	yield fork(checkoutPageSaga, checkoutPageDitch)
}
