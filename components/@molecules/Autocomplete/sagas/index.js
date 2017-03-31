import { saga, sagaEffects } from '@libs/lash'
import api from '@libs/api'
import duck, { suggestionsStatusValue } from '../ducks'

const { delay } = saga
const { take, takeLatest, put, call, fork, cancel, cancelled, select, debounce } = sagaEffects
const { NONE, REQUEST_LOADING, LOADING, LOADING_SUCCESS, LOADING_ERROR } = suggestionsStatusValue

const DEBOUNCE_TIME_MS = 150

function* fetchSuggestions (value, autocompleteDitch) {

	const { actions } = autocompleteDitch

	try {
		const { body: suggestions } = yield call(api.fetchSuggestions, value)
		console.log(suggestions)

		yield put(actions.setSuggestions(suggestions))
		yield put(actions.setSuggestionsStatus(LOADING_SUCCESS))
	}
	catch (error) {
		yield put(actions.setSuggestionsStatus(LOADING_ERROR))
	}
	finally {
		if (yield cancelled()) {
			console.log('fetching suggestions cancelled')
		}
	}
}

function* requestLoadingFlow (autocompleteDitch) {
	// debounce
	yield call(delay, DEBOUNCE_TIME_MS)
	const selector = autocompleteDitch.selector.bind(autocompleteDitch)
	const value = yield select((state) => selector(state).inputValue)
	const { actions, constants } = autocompleteDitch
	if (value.length > 1) {
		yield put(actions.setSuggestionsStatus(LOADING))

		const fetchingTask = yield fork(fetchSuggestions, value, autocompleteDitch)

		const status = yield take(constants.setSuggestionsStatus)

		if (status.payload === NONE) {
			yield cancel(fetchingTask)
		}
	}
}

export default function* (ditch) {

	const { constants } = ditch

	yield takeLatest(constants.requestSuggestionsLoading, requestLoadingFlow, ditch)

	// yield debounce(DEBOUNCE_TIME_MS, constants.requestSuggestionsLoading, requestLoadingFlow)
}

