import { each, isPlainObject } from 'lodash'
import md5 from 'blueimp-md5'
import MPS from '@libs/mono-pub-sub'
import env from '@utils/env'
import { Paginator, DATA_SORTED, PAGE_CHANGED } from '@libs/paginator'
import { Query, START_LOADING, STOP_LOADING, DATA_UPDATED, DATA_LOADED } from '@libs/ob'

import { MockQuery } from '@libs/ob-mock'


export const DEFAULT_CHANNEL = 'travelab'

const observer = new MPS

const DBStatus = {
	status: null,
	dbUpdatedAt: null,
	pagesUpdatedAt: null
}

const paginator = new Paginator(observer)

const mktime = () => (new Date()).getTime()
const calcOffersHash = (offers) => md5(offers.map((offer) => offer['id']).join(':'))
const normalizeOffers = (offers) => (offers)

let store = []
let filter = {}
let query = null
let timer

observer.on(({ type }) => {
	if (type === START_LOADING) {
		store = []
		paginator.reset(store)
		let now = mktime()
		DBStatus.status = START_LOADING
		DBStatus.dbUpdatedAt = now
		DBStatus.pagesUpdatedAt = now
	}
	else if (type === STOP_LOADING) {
		DBStatus.status = STOP_LOADING
	}
	else if (type === DATA_LOADED) {
		DBStatus.status = DATA_LOADED
	}
	else if (type === DATA_UPDATED) {
		let now = mktime()
		let oldOffersHash = calcOffersHash(paginator.items)
		store = query.get()
		paginator.items = normalizeOffers(store)
		let newOffersHash = calcOffersHash(paginator.items)

		DBStatus.status = DATA_UPDATED
		DBStatus.dbUpdatedAt = now
		if (oldOffersHash != newOffersHash) DBStatus.pagesUpdatedAt = now
	}
	else if (type === DATA_SORTED || type === PAGE_CHANGED) {
		DBStatus.pagesUpdatedAt = mktime()
	}
})

const getStatus = () => (DBStatus)

const getOffers = () => (store)

const setFilter = (option, channel = DEFAULT_CHANNEL) => {
	each(option, (val, key) => {
		if (key in filter && isPlainObject(val)) {
			filter[key] = { ...filter[key], ...val }
		}
		else {
			filter[key] = val
		}
	})

	if (query === null) {
		query = (env.isDev ? MockQuery : Query).make(filter, channel)
		query.on(observer.emit)
		query.start()
	}
	else {
		query.reset(filter)
	}

}

const setSort = (option) => {
	paginator.sort = option
}

const setPage = ({ selected }) => {
	paginator.currentPage = selected
}

const setLimit = (val) => {
	paginator.limit = val
}

const getFilter = () => (filter)

export default {
	START_LOADING,
	STOP_LOADING,
	DATA_UPDATED,
	DATA_LOADED,
	observer,
	paginator,
	getStatus,
	getCurrent: getOffers,
	setFilter,
	getFilter,
	setSort,
	setPage,
	setLimit,
}
