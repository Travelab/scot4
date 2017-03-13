import { saga, sagaEffects } from '@libs/lash'
import formSaga from '@organisms/PassengersForm/sagas/index.js'

const { take, put, call, fork, cancel, select } = sagaEffects

let formsListDitch = null
let passengersFormsDitch = null

function* initialFormsCreate ({ count, category, keyPrefix }) {
	for (let i = 0; i < count; i++ ) {
		yield put(passengersFormsDitch.actions.addFormToList({
			formKey: keyPrefix + i,
			formCategory: category
		}))
	}
}

function* formsFactory () {
	const { constants } = formsListDitch
	const selector = formsListDitch.selector.bind(formsListDitch)

	while (true) {
		const action = yield take([
			constants.addAdults,
			constants.addChildren,
			constants.addInfants,
			constants.setAdults,
			constants.setChildren,
			constants.setInfants,
			constants.removeAdult,
			constants.removeChild,
			constants.removeInfant
		])

		const state = yield select((state) => selector(state))

		const isAdultsAction = action.type === constants.addAdults
			|| action.type === constants.setAdults
			|| action.type === constants.removeAdult
		const isChildrenAction = action.type === constants.addChildren
			|| action.type === constants.setAdults
			|| action.type === constants.removeChild
		const isInfantsAction = action.type === constants.addInfants
			|| action.type === constants.setInfants
			|| action.type === constants.removeInfant

		if (isAdultsAction) {
			const adults = state.adults
			const isAddAction = action.type === constants.addAdults
			const isSetAction = action.type === constants.setAdults
			const isRemoveAction = action.type === constants.removeAdult

			if (isAddAction) {
				yield put(passengersFormsDitch.actions.addFormToList({
					formKey: 'a' + (adults - 1),
					formCategory: 'adult'
				}))
			}
			else if (isSetAction) {
				yield call(initialFormsCreate, { count: adults, category: 'adult', keyPrefix: 'a' })
			}
			else if (isRemoveAction) {
				const formKey = 'a' + adults
				yield put(passengersFormsDitch.actions.removeFormFromList(formKey))
			}
		}
		else if (isChildrenAction) {
			const children = state.children
			const isAddAction = action.type === constants.addChildren
			const isSetAction = action.type === constants.setChildren
			const isRemoveAction = action.type === constants.removeChild

			if (isAddAction) {
				yield put(passengersFormsDitch.actions.addFormToList({
					formKey: 'c' + (children - 1),
					formCategory: 'child'
				}))
			}
			else if (isSetAction) {
				yield call(initialFormsCreate, { count: children, category: 'child', keyPrefix: 'c' })
			}
			else if (isRemoveAction) {
				const formKey = 'c' + children
				yield put(passengersFormsDitch.actions.removeFormFromList(formKey))
			}
		}
		else if (isInfantsAction) {
			const infants = state.infants
			const isAddAction = action.type === constants.addInfants
			const isSetAction = action.type === constants.setInfants
			const isRemoveAction = action.type === constants.removeInfant

			if (isAddAction) {
				yield put(passengersFormsDitch.actions.addFormToList({
					formKey: 'i' + (infants - 1),
					formCategory: 'infant'
				}))
			}
			else if (isSetAction) {
				yield call(initialFormsCreate, { count: infants, category: 'infant', keyPrefix: 'i' })
			}
			else if (isRemoveAction) {
				const formKey = 'i' + infants
				yield put(passengersFormsDitch.actions.removeFormFromList(formKey))
			}
		}
	}
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
	}
}

function* watchChangesFormsDitchesList () {
	const { constants } = passengersFormsDitch

	while (true) {
		const { payload: { formKey  } } = yield take(constants.addFormToList)

		const ditch = yield call(passengersFormsDitch.getDitch.bind(passengersFormsDitch), formKey)
		yield fork(formSaga,ditch)
	}
}

function* watchLifecycle () {
	const { constants } = formsListDitch

	while (true) {
		yield take(constants.componentWillMount)

		const formsFactoryTask = yield fork(formsFactory)
		const consistSetterWatcher = yield fork(watchConsistSetter)
		const formsDitchesChangeWatcher = yield fork(watchChangesFormsDitchesList)

		yield take(constants.componentWillUnmount)

		yield cancel(formsFactoryTask)
		yield cancel(consistSetterWatcher)
		yield cancel(formsDitchesChangeWatcher)
	}
}

export default function* (ditch) {
	formsListDitch = ditch
	passengersFormsDitch = ditch.getDitch('passengersForms')

	yield [
		fork(watchLifecycle)
	]
}
