import { saga, sagaEffects } from '@libs/lash'
import formSaga from '@organisms/PassengersForm/sagas/index.js'
import { range, mapValues, values, flattenDeep } from 'lodash'

const { take, put, call, fork, cancel, select } = sagaEffects

let formsListDitch = null
let passengersFormsDitch = null

function* updateFormsList (consistByPrefix) {
	const makePrefixesKeys = (indexes, prefix) => indexes.map( i => prefix + i )
	const formsKeysByPrefix = mapValues(consistByPrefix, (count, prefix) => makePrefixesKeys(range(count), prefix))
	const formsKeys = flattenDeep(values(formsKeysByPrefix))

	yield put(passengersFormsDitch.actions.updateFormsList(formsKeys))
}

function* watchConsistSetter () {
	const { constants, actions } = formsListDitch

	while (true) {
		const { payload: consist } = yield take(constants.setConsist)

		const adults = consist[0]
		const children = consist[1]
		const infants = consist[2]

		yield put(actions.setAdults(adults))
		yield put(actions.setChildren(children))
		yield put(actions.setInfants(infants))

		const consistByPrefix = { a: adults, c: children, i: infants }

		yield call(updateFormsList, consistByPrefix)
	}
}

function* watchChangesFormsDitchesList () {
	const { constants } = passengersFormsDitch
	let formsTasks = []

	while (true) {
		const { payload: { formKey  } } = yield take(constants.updateFormsList)
		const formsTasksLen = formsTasks.length
		for (let i = 0; i < formsTasksLen; i++) {
			yield cancel(formsTasks.pop())
		}

		const ditches = yield call(passengersFormsDitch.getDitches.bind(passengersFormsDitch))
		const ditchesKeys = Object.keys(ditches)
		const ditchesKeysLen = ditchesKeys.length
		for (let i = 0; i < ditchesKeysLen; i++) {
			formsTasks[i] = yield fork(formSaga, ditches[ditchesKeys[i]])
		}
	}
}

function* watchLifecycle () {
	const { constants } = formsListDitch

	while (true) {
		yield take(constants.componentWillMount)

		const consistSetterWatcher = yield fork(watchConsistSetter)
		const formsDitchesChangeWatcher = yield fork(watchChangesFormsDitchesList)

		yield take(constants.componentWillUnmount)

		yield cancel(consistSetterWatcher)
		yield cancel(formsDitchesChangeWatcher)
	}
}

export default function* (ditch) {
	formsListDitch = ditch
	passengersFormsDitch = ditch.getDitch('passengersForms')

	yield [
		// fork(watchLifecycle) // uncomment when fix work with rerendering
		fork(watchConsistSetter),
		fork(watchChangesFormsDitchesList)
	]
}
