import { sagaEffects } from '@libs/lash'
const { fork } = sagaEffects

import caSerpPageSaga from '@ecosystems/CaSerpPage/sagas'

export default function* (ditch) {
	const { caSerpPageDitch } = ditch.getDitches()
	yield fork(caSerpPageSaga, caSerpPageDitch)
}
