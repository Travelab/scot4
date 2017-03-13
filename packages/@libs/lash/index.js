import * as redux from 'redux'
import * as reactRedux from 'react-redux'

import * as saga from 'redux-saga'
import * as sagaEffects from 'redux-saga/effects'

import { untouch } from './utils'
import createDuck from './createDuck/index.js'
import connectDuck from './connectDuck/index.js'
import configureStore from './configure-store.js'

export {
	redux,
	reactRedux,
	saga,
	sagaEffects,

	untouch,
	createDuck,
	connectDuck,
	configureStore
}