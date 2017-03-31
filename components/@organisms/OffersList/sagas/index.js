import obc from '@libs/obc'
import { saga, sagaEffects } from '@libs/lash'

const { eventChannel } = saga
const { take, put, call, fork, cancel, race } = sagaEffects

let channel
let offersListDitch
let serpOffersDitch


/******************************************************************************/
/***************************** Subroutines ************************************/
/******************************************************************************/
function* actualizeOffers () {
	const DBStatus = yield call(obc.getStatus)

	const offers = obc.paginator.items
	const pagesUpdatedAt = DBStatus.pagesUpdatedAt

	yield put(serpOffersDitch.actions.updateOffers({ offers }))
	yield put(offersListDitch.actions.updateStatus({ pagesUpdatedAt, dbStatus: DBStatus.status }))
}


/******************************************************************************/
/***************************** Watchers ***************************************/
/******************************************************************************/
function* watchOBChanges () {
	while (true) {
		yield take(channel)
		yield call(actualizeOffers)
	}
}

function* watchOfferHover () {
	const { setActiveOffer } = offersListDitch.actions
	const { updateOffers } = serpOffersDitch.constants

	const hoverConstants = []

	const updateHoverConstants = () => {

		hoverConstants.length = 0

		serpOffersDitch.ditches.forEach((ditch, key) => {
			hoverConstants.push(ditch.constants.mouseEnter)
			hoverConstants.push(ditch.constants.mouseLeave)
		})
	}

	updateHoverConstants()

	while (true) {

		const { updated, hover } = yield race({
			updated: take(updateOffers),
			hover: take(hoverConstants),
		})

		if (updated) updateHoverConstants()
		else if (hover)
			yield put(setActiveOffer(hover.payload))
	}
}

function* watchLifecycle () {
	const { constants } = offersListDitch
	const offersListWillMount = constants.componentWillMount
	const offersListWillUnmount = constants.componentWillUnmount

	while (true) {
		yield take(offersListWillMount)

		channel = eventChannel(obc.observer.on)

		yield call(actualizeOffers)

		const obWatcher = yield fork(watchOBChanges)
		const actionsWatcher = yield fork(watchOfferHover)

		yield take(offersListWillUnmount)

		channel.close()
		cancel(obWatcher)
		cancel(actionsWatcher)
	}
}


/******************************************************************************/
/***************************** Root *******************************************/
/******************************************************************************/
export default function* (ditch) {
	offersListDitch = ditch
	serpOffersDitch = ditch.getDitch('serpOffers')

	yield [
		fork(watchLifecycle),
	]
}
