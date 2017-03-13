import autocompleteSaga from '@molecules/Autocomplete/sagas'
import obc from '@libs/obc'
import { saga, sagaEffects } from '@libs/lash'
const { take, put, fork, call } = sagaEffects

// import duck from '../ducks'
// const { constants, actions } = duck
let searchBarDitch = null

function* watchFiltersChange () {
	const { constants } = searchBarDitch

	while (true) {
		const { payload } = yield take(constants.setFilter)
		yield call(console.log, payload) // mock for test
		yield call(obc.setFilter, payload)
	}
}

export default function* (ditch) {
	searchBarDitch = ditch

	const { srcAutocomplete, dstAutocomplete } = ditch.getDitches()

	yield [
		fork(watchFiltersChange),
		fork(autocompleteSaga, srcAutocomplete),
		fork(autocompleteSaga, dstAutocomplete)
	]
}

