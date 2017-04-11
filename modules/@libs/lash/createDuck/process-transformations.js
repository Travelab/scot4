import { forEach, get, snakeCase } from 'lodash'

import { untouch } from '../utils/index'

import createAction from './create-action.js'


export default (args) => {

	const {
		name,
		initialState,
		composes = [],
		transformations,
		moduleMiddleware = [],
		defaultReducer = untouch,

	} = args

	const actions = {}
	const constants = {}
	const reducerMap = {} //

	forEach(transformations, (transformation, transformationName) => {

		if (typeof transformationName !== 'string')
			throw new Error('`transformations` value must be an object')

		let parsed = {
			middleware: [],
			reducer: untouch,
			namespaced: true,
			actionName: transformationName,
			type: snakeCase(transformationName).toUpperCase(),
		}

		if (typeof transformation === 'function')
			parsed.reducer = transformation
		else if (typeof transformation === 'object')
			parsed = { ...parsed, ...transformation }
		else
			throw new Error('`transformations` values must be an object or a function')

		const { middleware, reducer, namespaced, actionName, type } = parsed
		const finalMiddleware = [ ...middleware, ...moduleMiddleware ]
		const constant = namespaced ? `${name}/${type}` : type

		actions[actionName] = createAction(constant, finalMiddleware)
		constants[actionName] = constant
		reducerMap[constant] = reducer
	})

	const reducer = (state = initialState, action) => {

		const localReducer = get(reducerMap, action.type, defaultReducer)

		if (composes.length) {

			return [ localReducer, ...composes ]
				.reduce((newState, currentReducer) => currentReducer(newState, action), state)
		}
		else return localReducer(state, action)
	}

	return {
		reducer,
		actions,
		constants,
	}
}
