import { uniqueId } from 'lodash'

import { Duck } from './Duck.js'

class DuckFactory {
	constructor (options) {

		if (typeof options !== 'object')
			throw new Error('First argument must be an object')

		this.spray = options.spray || null
		this.isfwl = options.isfwl || false
		this.composes = options.composes || []
		this.ducklings = options.ducklings || null
		this.name = options.name || uniqueId('duck')
		this.initialState = options.initialState || {}
		this.moduleMiddleware = options.middleware || []
		this.transformations = options.transformations || {}

		this.ct = 0
	}

	unify (branchName) {

		return `${branchName}.${this.ct++}`
	}

	raiseDuckling (arg1, arg2) {

		let {
			name,
			spray,
			isfwl,
			composes,
			ducklings,
			initialState,
			raiseDuckling,
			moduleMiddleware,
			transformations,
		} = this

		raiseDuckling = raiseDuckling.bind(this)

		if (typeof arg1 === 'string') name = arg1
		else if (typeof arg1 === 'function') spray = arg1
		if (typeof arg2 === 'function') spray = arg2

		name = this.unify(name)

		return new Duck({
			name,
			spray,
			isfwl,
			composes,
			ducklings,
			initialState,
			raiseDuckling,
			moduleMiddleware,
			transformations,
		})
	}
}

export {
	DuckFactory
}