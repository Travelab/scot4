import { saga, sagaEffects } from '@libs/lash'
const { take, put, call, fork, cancel, cancelled, select } = sagaEffects

import sagaPassengersDataList from '@organisms/PassengersDataList/sagas'
import sagaCreditCardForm from '@organisms/CreditCardForm/sagas'
import sagaCustomerForm from '@organisms/CustomerForm/sagas'

let orderFormDitch

/******************************************************************************/
/****************************  Subroutines  ***********************************/
/******************************************************************************/

// Description
function* throwBuyAction () {
	const { actions } = orderFormDitch
	yield put(actions.buy())
}


/******************************************************************************/
/****************************    Watchers   ***********************************/
/******************************************************************************/

// Description
function* watchBuyClick (ditch) {

	const { constants } = ditch

	try {
		while (true) {

			yield take(constants.buy)

			yield call(throwBuyAction)
		}
	} finally {

		if (yield cancelled()) console.log('Was cancelled')
	}
}


/******************************************************************************/
/****************************      Root     ***********************************/
/******************************************************************************/
export default function* (ditch) {
	orderFormDitch = ditch
	const { creditCardDitch, customerFormDitch, passengersDataListDitch, paymentDetailsDitch } = ditch.getDitches()

	yield [
		fork(watchBuyClick, paymentDetailsDitch),
		fork(sagaPassengersDataList, passengersDataListDitch),
		fork(sagaCreditCardForm, creditCardDitch),
		fork(sagaCustomerForm, customerFormDitch),
	]
}
