import { saga, sagaEffects } from '@libs/lash'
import obc from '@libs/obc'
import duck from '../ducks'

let offersSortOptionsDitch

const { takeEvery, call } = sagaEffects


function* setSort(action) {
	yield call(obc.setSort, action.payload.option)
}

export default function* (ditch) {
	offersSortOptionsDitch = ditch
	
	const { constants } = offersSortOptionsDitch

	yield takeEvery(constants.sort, setSort)
}
