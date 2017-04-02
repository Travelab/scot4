import { slice, sortBy } from 'lodash'


const DATA_SORTED = 'DATA_SORTED'
const PAGE_CHANGED = 'PAGE_CHANGED'

class Paginator {
	constructor (observer, limit = 10, items = [], sort=null) {
		this.observer = observer

		this._limit = limit
		this._items = items
		this._currentPage = 0
		this._sort = null

		this._prepareData()
	}

	set limit (val) {
		this._limit = val

		this._prepareData()
	}

	get limit () {
		return this._limit
	}

	set items (val) {
		this._items = val

		this._prepareData()
	}

	get items () {
		return this._slicedItems
	}

	set currentPage (val) {
		if (this._currentPage == val) return null

		if (val < 0 || val > this.totalPages - 1) {
			throw new Error('Invalid range of pages')
		}

		this._currentPage = val

		this._sliceItems()

		this._emit(PAGE_CHANGED)
	}

	get currentPage () {
		return this._currentPage
	}

	set sort (val) {
		this._sort = val

		this._sliceItems()

		this._emit(DATA_SORTED)
	}

	get sort () {
		return this._sort
	}

	reset (items) {
		this._items = items
		this._currentPage = 0
		this._prepareData()
	}

	_calcTotalPages () {
		this.totalPages = Math.ceil(this._items.length / this.limit)
	}

	_sliceItems() {
		const begin = this.currentPage * this.limit
		const end = begin + this.limit

		this._slicedItems = slice(
			this._sortItems(this._items),
			begin,
			end
		)
	}

	_sortItems (items) {
		if (this.sort) {
			const mod = this.sort[1] == 'asc' ? 1 : -1
			return sortBy(items, (item) => item[this.sort[0]] * mod)
		}
		else {
			return items
		}
	}

	_prepareData () {
		this._calcTotalPages()
		this._sliceItems()
	}
	
	_emit (typeOfAction) {
		if (this.observer) this.observer.emit({ type: typeOfAction })
	}
}

export { Paginator, DATA_SORTED, PAGE_CHANGED }
