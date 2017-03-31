import obc from '@libs/obc'
import searchBarSaga from '@organisms/SearchBar/sagas'
import caSerpOffersViewerSaga from '@ecosystems/CaSerpOffersViewer/sagas'
import { saga, sagaEffects } from '@libs/lash'
import { getPath, parseUrlPath } from '../utils'

const { fork, put, call, takeEvery, cancel } = sagaEffects
const { eventChannel } = saga
const { START_LOADING, DATA_UPDATED, DATA_LOADED } = obc

const channel = eventChannel(obc.observer.on)


function* checkOBCStatus (ditch) {
	const { status } = yield call(obc.getStatus)
	const { actions } = ditch

	switch (status) {
		case START_LOADING:
			yield put(actions.setOffersLoadingFlag(true))
			break
			
		case DATA_UPDATED:
		case DATA_LOADED:
			yield call(saga.delay, 500)
			yield put(actions.setOffersLoadingFlag(false))
	}
}

function* watchOBChanges (ditch) {
	yield takeEvery(channel, function* () {
		yield call(checkOBCStatus, ditch)
	})
}


function* putActionsToFillSearchBar (filters, ditch) {
	const searchBarDitch = ditch.getDitch('searchBar')
	const { actions: searchBarActions } = searchBarDitch

	const srcAutocompleteActions = searchBarDitch.getDitch('srcAutocomplete').actions
	const dstAutocompleteActions = searchBarDitch.getDitch('dstAutocomplete').actions

	yield [
		put(searchBarActions.setOutboundDate(filters.outboundDate)),
		put(searchBarActions.setInboundDate(filters.inboundDate)),
		put(searchBarActions.selectAdults(filters.consist.adults)),
		put(searchBarActions.selectChildren(filters.consist.children)),
		put(searchBarActions.selectInfants(filters.consist.infants)),

		put(srcAutocompleteActions.setValue(filters.departureLocation.title)),
		put(srcAutocompleteActions.setRawValue(filters.departureLocation)),

		put(dstAutocompleteActions.setValue(filters.destinationLocation.title)),
		put(dstAutocompleteActions.setRawValue(filters.destinationLocation)),
	]
}


function* watchLifecycle (ditch) {
	const { componentWillMount, componentWillUnmount } = ditch.constants

	let watcher

	yield takeEvery(componentWillMount, function* () {
		watcher = yield fork(watchOBChanges, ditch)

		const { searchBar, obc: filters } = parseUrlPath(getPath())

		yield call(putActionsToFillSearchBar, searchBar, ditch)
		yield call(obc.setLimit, 9)
		yield call(obc.setFilter, filters, 'clickavia')
	})

	yield takeEvery(componentWillUnmount, function* () {
		yield cancel(watcher)
	})
}


export default function* (ditch) {

	const { caSerpOffersViewer, searchBar } = ditch.getDitches()

	yield [
		fork(watchLifecycle, ditch),
		fork(searchBarSaga, searchBar),
		fork(caSerpOffersViewerSaga, caSerpOffersViewer),
	]
}

