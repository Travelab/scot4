import { combineReducers } from 'redux'

// Ordinary ditches combiner sign
const ODCS = '$'

class PreDitches {
	constructor (options) {

		this.sourceDuck = options.sourceDuck
		this.sourceDitch = options.sourceDitch

		this.current = {}
		this.currentKeys = []
	}
	get (key) {

		return this.current[key]
	}
	getAll () {

		return this.current
	}
	forEach (fn, context) {

		return this.currentKeys.forEach((key) => {

			const ditch = this.current[key]

			fn.call(context, ditch, key, this.current)
		})
	}
	__add (key, ditch) {

		this.current[key] = ditch
		this.currentKeys.push(key)
	}
	__remove (key) {

		delete this.current[key]
		const index = this.currentKeys.indexOf(key)
		if (~index) this.currentKeys.splice(index, 1)
	}
}

class OrdinaryDitches extends PreDitches {
	constructor (options) {
		super(options)

		const sourceDuck = this.sourceDuck

		this.initialState = {
			...sourceDuck.initialState,
			[ODCS]: {}
		}

		this.reducers = {}
	}
	add (key, duck) {

		const sourceDitch = this.sourceDitch

		const ditch = duck.makeDitch({
			parentDitch: sourceDitch
		})

		const { name, reducer, initialState } = ditch

		this.__add(key, ditch)

		this.reducers[name] = reducer

		this.initialState[ODCS][name] = initialState

		ditch.points.push(ODCS)

		return ditch
	}
	getReducer () {

		const initialState = this.initialState
		const ditchesReducer = combineReducers(this.reducers)

		return (state = initialState, action) => {

			return {
				...state,
				[ODCS]: ditchesReducer(state[ODCS], action)
			}
		}
	}
}

class ExtraordinaryDitches extends PreDitches {
	constructor (options) {
		super(options)

		this.initialState = {}
	}
	update (next) {

		this.currentKeys.forEach(function (key) {
			if (!next[key]) this.remove(key)
		}, this)

		Object.keys(next).forEach(function (key) {
			if (!this.current[key]) this.add(key)
		}, this)
	}
	remove (key) {

		this.__remove(key)

		delete this.initialState[key]
	}
	add (key) {

		const sourceDuck = this.sourceDuck
		const sourceDitch = this.sourceDitch

		const ditch = sourceDuck.makeDitch({
			parentDitch: sourceDitch,
			name: key
		})

		this.__add(key, ditch)

		this.initialState[key] = ditch.initialState

		return ditch
	}
	getReducer () {

		const initialState = this.initialState

		return (state = initialState, action) => {

			const newState = {}

			this.forEach((ditch, key) => { newState[key] = ditch.reducer(state[key], action) })

			return newState
		}
	}
}

export {
	OrdinaryDitches,
	ExtraordinaryDitches
}
