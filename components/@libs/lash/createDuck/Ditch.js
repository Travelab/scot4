import processTransformations from './process-transformations.js'
import { OrdinaryDitches, ExtraordinaryDitches } from './Ditches.js'
import { untouch } from '../utils'

class PreDitch {
	constructor (options) {

		const { name, parentDuck, parentDitch } = options

		this.name = name
		this.points = [ name ]
		this.parentDuck = parentDuck
		this.parentDitch = parentDitch
	}
	getState (state) {

		return this.points.reduceRight((state, point) => (state[point]), state)
	}
	selector (state) {

		if (this.parentDitch) {

			const parentState = this.parentDitch.selector(state)

			return this.getState(parentState)
		}

		return state
	}
	getDitch (key) {

		return this.ditches.get(key)
	}
	getDitches () {

		return this.ditches.getAll()
	}
}

class ChildlessDitch extends PreDitch {
	constructor (options) {
		super(options)

		const name = this.name
		const parentDuck = this.parentDuck

		const {
			isfwl,
			composes,
			initialState,
			transformations,
			moduleMiddleware,
		} = parentDuck

		// Include Staff For Watch Lifecycle
		if (isfwl) {

			transformations.componentWillMount = untouch
			transformations.componentWillUnmount = untouch
		}

		const { reducer, actions, constants } = processTransformations({
			name,
			composes,
			initialState,
			transformations,
			moduleMiddleware,
		})

		this.reducer = reducer
		this.actions = actions
		this.constants = constants
		this.initialState = initialState
	}
}

class OrdinaryDitch extends PreDitch {
	constructor (options) {
		super(options)

		const name = this.name
		const parentDuck = this.parentDuck

		const {
			isfwl,
			ducklings,
			transformations,
			moduleMiddleware,
		} = parentDuck

		// Include Staff For Watch Lifecycle
		if (isfwl) {

			transformations.componentWillMount = untouch
			transformations.componentWillUnmount = untouch
		}

		const ditches = new OrdinaryDitches({
			sourceDitch: this,
			sourceDuck: parentDuck,
		})

		Object.keys(ducklings).forEach((key) => {
			const duck = ducklings[key]
			ditches.add(key, duck)
		})

		const initialState = ditches.initialState
		const composes = [ ...parentDuck.composes, ditches.getReducer() ]

		const { reducer, actions, constants } = processTransformations({
			name,
			composes,
			initialState,
			transformations,
			moduleMiddleware,
		})

		this.ditches = ditches
		this.reducer = reducer
		this.actions = actions
		this.constants = constants
		this.initialState = initialState
	}
}

class ExtraordinaryDitch extends PreDitch {
	constructor (options) {
		super(options)

		const name = this.name
		const parentDuck = this.parentDuck

		const ordinaryDuck = parentDuck.raiseDuckling()

		const ditches = new ExtraordinaryDitches({
			sourceDitch: this,
			sourceDuck: ordinaryDuck,
		})

		const transformations = parentDuck.spray(ditches)

		const composes = [ ditches.getReducer() ]
		const initialState = ditches.initialState

		const { reducer, actions, constants } = processTransformations({
			name,
			composes,
			initialState,
			transformations,
		})

		this.ditches = ditches
		this.reducer = reducer
		this.actions = actions
		this.constants = constants
		this.initialState = initialState
	}
}

export {
	ChildlessDitch,
	OrdinaryDitch,
	ExtraordinaryDitch
}