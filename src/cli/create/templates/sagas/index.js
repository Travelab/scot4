import { saga, sagaEffects } from 'libs/lash'
const { take, put, call, fork, cancel, cancelled } = sagaEffects

import duck from '../ducks/index.js'
const { constants, actions } = duck


/******************************************************************************/
/****************************  Subroutines  ***********************************/
/******************************************************************************/

// Description
function* functionName1 () {}


/******************************************************************************/
/****************************    Watchers   ***********************************/
/******************************************************************************/

// Description
function* watchFunctionName2 () {

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
export default function* () {

	yield [
		fork(watchFunctionName2),
		fork(watchFunctionName2)
	]
}