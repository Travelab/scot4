import { pureSagaEffects } from '@libs/lash'
const { fork } = pureSagaEffects

import serpPageSaga from '@ecosystems/SerpPage/sagas'

export default function* () {
	yield fork(serpPageSaga)
}
