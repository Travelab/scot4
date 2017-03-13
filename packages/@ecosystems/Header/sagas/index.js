import { sagaEffects } from '@libs/lash'
const { fork } = sagaEffects
import searchBarSaga from '@organisms/SearchBar/sagas'

export default function* (ditch) {
	yield [
		fork(searchBarSaga, ditch.getDitches().searchBar)
	]
}

