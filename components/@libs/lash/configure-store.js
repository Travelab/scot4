import env from '@utils/env'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

//import logSaga from './log-saga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [ sagaMiddleware ]

let composeEnhancers = compose

// Support Redux DevTools Extension
if (env.isDev && typeof window === 'object') {

	const RDTEC = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

	if (RDTEC) {

		composeEnhancers = RDTEC({
			// Specify here name, actionsBlacklist, actionsCreators and other options
		})
	}
}

const enhancer = composeEnhancers(
	applyMiddleware(...middleware),
	// other store enhancers if any
)

export default (rootReducer, preloadedState) => {

	rootReducer = rootReducer || function (state) { return state }
	preloadedState = preloadedState || {}

	const store = createStore(rootReducer, preloadedState, enhancer)

	return {
		...store,
		runSaga: sagaMiddleware.run
	}
}

