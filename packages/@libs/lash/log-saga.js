import env from '@utils/env'
import { take, fork } from 'redux-saga/effects'

function * log () {
	while (true) {

		let action = yield take()

		console.warn('LOG ACTION: %s', action.type)
	}
}

export default function * () {

	if (env.isDev) yield fork(log)
}