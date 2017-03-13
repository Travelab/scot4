import {
	get, groupBy, sortBy, every, takeRight, concat, omit
} from 'lodash'
import md5 from 'blueimp-md5'
import MPS from '@libs/mono-pub-sub'
import confy from '@utils/confy'
import OffersHandler from '@libs/offers-handler'


export const DATA_UPDATED = 'DATA_UPDATED'
export const DATA_LOADED = 'DATA_LOADED'
export const START_LOADING = 'START_LOADING'
export const STOP_LOADING = 'STOP_LOADING'


export class Query extends MPS {
	requiredFields = [
		'departDate',
		'returnDate',
		'src',
		'dst',
		'consist'
	]

	// event types
	constructor (filter) {
		super()

		this._filter = filter
		this._source = null
		this._key = null
		this._queryId = null
	}

	static make (filter) {
		return new Query(filter)
	}

	start () {
		this._init()
		this._key = this._makeKey(this._filter)

		this._source = new EventSource(this._prepareURL(this._filter))
		this._source.addEventListener('message', this._handleMessage.bind(this))
		this._source.addEventListener('error', this.stop.bind(this))

		this.emit({ type: START_LOADING })
	}

	reset (filter) {
		this.stop()

		this._filter = filter
		this._init()

		const key = this._makeKey(filter)

		if (this._key !== key) {
			this._key = key
			this._queryId = null
		}
		this.start()
	}

	stop ( type = STOP_LOADING ) {
		this.destroy()

		this.emit({ type })
	}

	destroy () {
		if (this._source && this._source.readyState !== EventSource.CLOSED) this._source.close()
	}

	get () {
		return this._result
	}

	getStreamURLPrefix () {
		return confy.get('API.tl.search')
	}

	_encodeObject (obj) {
		return Object.keys(obj).reduce(
			(acc, key) => (concat(acc, (key + '=' + encodeURIComponent(obj[key])))),
			[]
		).join('&')
	}

	_prepareLocationStr(loc) {
		return takeRight(loc.split(':'), 2).join(':')
	}

	_makeCoreQuery (filter) {
		const ADULTS_OFFSET = 0
		const CHILDREN_OFFSET = 1
		const INFANTS_OFFSET = 2

		const coreQuery = {
			'depart_date': filter['departDate'],
			'return_date': filter['returnDate'],
			'src': this._prepareLocationStr(filter['src']),
			'dst': this._prepareLocationStr(filter['dst']),
			'adults': filter['consist'][ADULTS_OFFSET],
			'children': filter['consist'][CHILDREN_OFFSET],
			'infants': filter['consist'][INFANTS_OFFSET],
			'channel': 'travelab',
		}
		if (this._queryId) {
			return { ...coreQuery, query_id: this._queryId }
		}
		else {
			return coreQuery
		}
	}

	_makeExtraQuery (filter) {
		const extraQuery = {}
		const keyMap = {}
		Object.keys(omit(filter, this.requiredFields)).map((key) => {
			const extraQueryKey = get(keyMap, key, key)
			extraQuery[extraQueryKey] = filter[key]
		})
		return extraQuery
	}

	_prepareURL (filter) {
		const coreQueryString = this._encodeObject(this._makeCoreQuery(filter))
		const extraQueryString = this._encodeObject(this._makeExtraQuery(filter))

		const queryString = `${coreQueryString}&${extraQueryString}`

		return `${this.getStreamURLPrefix()}?${queryString}`
	}

	// internal
	_handleMessage (event) {
		const data = JSON.parse(event.data)
		const queryId = get(data, 'meta.query_id')

		if (this._queryId === null && queryId) {
			this._queryId = queryId
		}

		if (data.status === 'SUCCESS') {
			this.stop(DATA_LOADED)
			return
		}

		this._processMessage(data.data || {})
	}

	_processMessage (data) {
		this._offersHandler.process(data)

		this._buildResult()
	}

	_buildResult () {
		const offersByHotel = groupBy(this._offersHandler.offers, (offer) => {
			return offer.hotelActivity.hotel['_id']
		})

		this._result = Object.keys(offersByHotel).map((hotelId) => {
			const offers = offersByHotel[hotelId]
			return this._shapeOffer(
				sortBy(offers, (offer) => offer.price)[0],
				offers.length
			)
		})
		if (this._result.length > 0) {
			this.emit({ type: DATA_UPDATED })
		}
	}

	_shapeOffer(offer, offersCount) {
		const hotelActivity = offer.hotelActivity
		const hotel = hotelActivity.hotel
		const DEFAULT_CONSIST = [ 1, 0, 0 ]

		return {
			id: offer.id,
			consist: this._filter.consist || DEFAULT_CONSIST,
			hotelName: hotelActivity['hotel_name'],
			rating: hotel.rating.total,
			distance: get(hotel, 'distances.city_center', 0),
			commentsCount: get(hotel, 'rating.reviews_count', 0),
			roomsCount: offersCount,
			refundable: every(offer.fares.map((fare) =>
				get(fare, 'cancellation_policy.refundable', false)
			)),
			stars: hotel.stars,
			mealType: offer.hotelFare.details.board,
			price: offer.price,
			currency: 'RUB',
			location: [ hotel.latitude, hotel.longitude ],
			images: hotel.images,
			amenities: hotel['amenity_ids']
		}
	}

	_makeKey (filter) {
		return this.requiredFields.map((fieldKey) => (
			get(filter, fieldKey, '').toString()
		)).join(':')
	}

	_init () {
		this._result = []
		this._offersHandler = new OffersHandler()
	}
}
