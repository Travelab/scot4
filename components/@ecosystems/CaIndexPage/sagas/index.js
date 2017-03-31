import env from '@utils/env'

import { sagaEffects } from '@libs/lash'
const { fork, take, put, call } = sagaEffects

import searchBarSaga from '@organisms/SearchBar/sagas'
import searchBarDuck from '@organisms/SearchBar/ducks'

const SRC_OFFSET = 0
const DST_OFFSET = 1
const DEPDATE_OFFSET = 2
const RETDATE_OFFSET = 3
const ADULTS_OFFSET = 4
const CHILDREN_OFFSET = 5
const INFANTS_OFFSET = 6
const TITLE_LOC_OFFSET = 0
const KIND_LOC_OFFSET = 1
const ID_LOC_OFFSET = 2

function* parseUrlPath (path) {
	const splittedPath = path.split('/')
	const pathParameters = splittedPath.slice(2) // delete ''/'serp-page'
	const src = pathParameters[SRC_OFFSET].split(':')
	const dst = pathParameters[DST_OFFSET].split(':')

	return {
		searchBar: {
			departureLocation: {
				title: src[TITLE_LOC_OFFSET],
				kind: src[KIND_LOC_OFFSET],
				id: src[ID_LOC_OFFSET]
			},
			destinationLocation: {
				title: dst[TITLE_LOC_OFFSET],
				kind: dst[KIND_LOC_OFFSET],
				id: dst[ID_LOC_OFFSET]
			},
			outboundDate: new Date(pathParameters[DEPDATE_OFFSET]),
			inboundDate: new Date(pathParameters[RETDATE_OFFSET]),
			consist: {
				adults: parseInt(pathParameters[ADULTS_OFFSET]),
				children: parseInt(pathParameters[CHILDREN_OFFSET]),
				infants: parseInt(pathParameters[INFANTS_OFFSET])
			}
		}
	}
}

function* putActionsToFillSearchBar (filters, caIndexPageDitch) {
	const searchBarDitch = caIndexPageDitch.getDitch('searchBar')
	const srcAutocompleteDitch = searchBarDitch.getDitch('srcAutocomplete')
	const dstAutocompleteDitch = searchBarDitch.getDitch('dstAutocomplete')

	yield put(searchBarDitch.actions.setOutboundDate(filters.outboundDate))
	yield put(searchBarDitch.actions.setInboundDate(filters.inboundDate))
	yield put(searchBarDitch.actions.selectAdults(filters.consist.adults))
	yield put(searchBarDitch.actions.selectChildren(filters.consist.children))
	yield put(searchBarDitch.actions.selectInfants(filters.consist.infants))

	yield put(srcAutocompleteDitch.actions.setValue(filters.departureLocation.title))
	yield put(srcAutocompleteDitch.actions.setRawValue(filters.departureLocation))
	yield put(dstAutocompleteDitch.actions.setValue(filters.destinationLocation.title))
	yield put(dstAutocompleteDitch.actions.setRawValue(filters.destinationLocation))
}

function* watchLifecycle (caIndexPageDitch) {
	const { constants } = caIndexPageDitch

	while (true) {
		yield take(constants.componentWillMount)

		let path = ''

		if (env.isDev) {
			let today = new Date()

			today.setDate(today.getDate() + 7)
			let outDate = today.toISOString().slice(0, 10)
			today.setDate(today.getDate() + 7)
			let inbDate = today.toISOString().slice(0, 10)
			path = `/serp-page/Москва:locality:3064/Сочи:locality:3189/${outDate}/${inbDate}/1/0/0`
		}
		else if (env.isProd) {
			path = decodeURI(window.location.pathname)
		}
		const searchFilters = yield call(parseUrlPath, path)

		yield call(putActionsToFillSearchBar, searchFilters.searchBar, caIndexPageDitch)

		yield take(constants.componentWillUnmount)
	}
}

export default function* (ditch) {
	const { searchBar } = ditch.getDitches()
	yield [
		fork(watchLifecycle, ditch),
		fork(searchBarSaga, searchBar)
	]
}


