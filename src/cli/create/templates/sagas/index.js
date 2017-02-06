import { saga, sagaEffects } from 'libs/lash'
const { take, put, call, fork, cancel, cancelled, select } = sagaEffects


/******************************************************************************/
/****************************  Subroutines  ***********************************/
/******************************************************************************/

// Description
function* functionName1 () {}


/******************************************************************************/
/****************************    Watchers   ***********************************/
/******************************************************************************/

// Description
function* watchFunctionName2 (ditch) {

	const { constants, actions, selector } = ditch

	try {
		while (true) {

			yield take(constants.clickHandler)<% if (isfwl) { %>
			yield take(constants.componentWillMount)
			yield take(constants.componentWillUnmount)<% } %>
		}
	} finally {

		if (yield cancelled()) console.log('Was cancelled')
	}
}


/******************************************************************************/
/****************************      Root     ***********************************/
/******************************************************************************/
export default function* (ditch) {

	yield [
		fork(watchFunctionName2, ditch),
		fork(watchFunctionName2)
	]
}