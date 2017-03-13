import { ChildlessDitch, OrdinaryDitch, ExtraordinaryDitch } from './Ditch.js'

class PreDuck {
	constructor () {

		this.ct = 0
	}
	makeDitch (options = {}) {

		const { parentDitch, name } = options

		const ditchName = name === undefined
			? `${this.name}.${this.ct++}`
			: name

		const ditchOptions = {
			parentDitch,
			parentDuck: this,
			name: ditchName
		}

		if (this.ducklings || this.spray) {

			return this.spray
				? new ExtraordinaryDitch(ditchOptions)
				: new OrdinaryDitch(ditchOptions)
		}

		return new ChildlessDitch(ditchOptions)
	}
}

class Duck extends PreDuck {
	constructor (options) {
		super()

		this.name = options.name
		this.spray = options.spray
		this.isfwl = options.isfwl
		this.composes = options.composes
		this.ducklings = options.ducklings
		this.initialState = options.initialState
		this.raiseDuckling = options.raiseDuckling
		this.transformations = options.transformations
		this.moduleMiddleware = options.moduleMiddleware
	}
}

export {
	Duck
}
