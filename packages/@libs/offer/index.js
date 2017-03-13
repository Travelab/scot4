import request from 'superagent'
import confy from '@utils/confy'
import { clone, get, find, filter, flattenDeep, sortBy, uniqBy, min } from 'lodash'

import Order from './order.js'
import OffersHandler from '@libs/offers-handler'

const DEFAULT_CHECKED_BAGGAGE_WEIGHT = 20
const DEFAULT_HAND_BAGGAGE_WEIGHT = 5

function shapeBaggage (baggage, kind = 'checked') {
	if (baggage.included === 0) {
		return []
	}
	else {
		const defaultWeight = kind === 'checked' ? DEFAULT_CHECKED_BAGGAGE_WEIGHT : DEFAULT_HAND_BAGGAGE_WEIGHT

		return Array.apply(null, Array(baggage.included)).
			map(Number.prototype.valueOf, baggage.weight || defaultWeight)
	}
}

function addDetailsToSegment (segment, currentFare) {
	const details = currentFare.details
	segment['cabin_class'] = details['seats_class']

	const baggage = details['baggage']
	segment['baggage'] = {
		checked: shapeBaggage(baggage.checked, 'checked'),
		unchecked: shapeBaggage(baggage.hand, 'hand'),
	}

	segment['meal'] = details['meal']['included']
	segment['consist'] = details['consist']
	segment['type'] = currentFare.service.subtype.split(':')[1]
	segment['fareId'] = currentFare.id
}

export default class {
	static fetch (id, currentUrl) {
		const url = confy.get('API.cl.offer') + `/${id}` + `?url=${currentUrl}&channel=${confy.get('API.cl.channel')}`

		const executor = (resolve, reject) => {
			request
				.get(url)
				.end((err, res) => {
					if (err || !res || !res.ok || !res.body) {
						reject(res.body || {})
					} else {
						const handler = new OffersHandler()
						handler.process(res.body.data)
						const isErrorStatus = res.body.status === 'UNAVAIL'
							|| res.body.status === 'INVALID'
						if (isErrorStatus) {
							reject(res.body.status)
						}
						else {
							resolve(handler.offers[0])
						}
					}
				})
		}

		return new Promise(executor)
	}

	constructor (rawOffer) {
		this._offer = rawOffer

		this._hotelFare = null
		this._hotelActivity = null
		this._flights = null
		this._segments = null
	}

	get raw () {
		return this._offer
	}

	get id () {
		return this._offer.id
	}

	get price () {
		return this._offer.price
	}

	get channel () {
		return this._offer.partner
	}

	get expireAt () {
		return new Date(min(this._offer['payment_schedule'].map((item) => (item['due_date']))))
	}

	get consist () {
		return this.flightFares[0]['details']['consist']
	}

	get fares () {
		return this._offer.fares
	}

	get flightFares () {
		return filter(this._offer.fares, (fare) => (fare.service.type === 'transfer'))
	}

	get includedFares () {
		const fareCounts = this._offer['fare_counts']
		return filter(this.fares, (fare) => {
			const counts = fareCounts[fare.id]
			fare.quantity = counts[1]
			return fare.quantity > 0
		})
	}

	get agreements () {
		const agrs = uniqBy(
			flattenDeep(this.includedFares.map((fare) => (fare.agreement))),
			'id'
		)
		if (agrs.length === 0) {
			agrs.push({
				id: 'travelabAgent',
				title: 'публичной оферты ООО «Тревелаб Агент»',
				url: 'https://s3-ap-southeast-1.amazonaws.com/prod-clickavia-docs/travelab_agreement.pdf',
			})
		}

		return agrs
	}

	get hotelFare () {
		if (this._hotelFare) return this._hotelFare

		return this._hotelFare = find(this._offer.fares, (fare) => (fare.service.type === 'accomodation'))
	}

	get hotelActivity () {
		if (this._hotelActivity) return this._hotelActivity

		if (this.hotelFare) {
			this._hotelActivity = find(this.hotelFare.service.activities, (activity) => ('hotel' in activity))
			return this._hotelActivity
		}
		else {
			return null
		}
	}

	get segments () {
		if (this._segments) return this._segments

		const services = this.flightFares.map((fare) => {
			fare.service.fareId = fare.id
			return fare.service
		})

		const segments = flattenDeep(services.map((service) => {
			let currentFare = find(this.fares, [ 'id', service.fareId ])

			return service.activities.map((activity) => {
				activity.segments.forEach((segment) => {
					addDetailsToSegment(segment, currentFare)
				})
				return activity.segments
			})
		}))
		this._segments = sortBy(segments, [ (segment) => (segment.depart.time) ])

		return this._segments
	}

	get flights () {
		if (this._flights) return this._flights

		return this._splitSegments(this.segments)
	}

	getOrder ({ orderId = null, currentUrl = null } = {}) {
		let executor
		if (orderId) {
			return this._loadOrder(orderId)
		}
		else {
			return this._createOrder(currentUrl)
		}
	}

	_createOrder (currentUrl) {
		const url = confy.get('API.cl.order')

		const executor = (resolve, reject) => {
			const data = {
				offer_id: this.id,
				channel: confy.get('API.cl.channel')
			}
			if (currentUrl) data.url = currentUrl

			request
				.post(url)
				.send(data)
				.end((err, res) => {
					this._endRequest(resolve, reject, err, res)
				})
		}

		return new Promise(executor)
	}

	_loadOrder (orderId) {
		const url = confy.get('API.cl.order') + `/${orderId}`

		const executor = (resolve, reject) => {
			request
				.get(url)
				.end((err, res) => {
					this._endRequest(resolve, reject, err, res)
				})
		}

		return new Promise(executor)
	}

	_endRequest(resolve, reject, err, res) {
		if (res.ok && get(res, 'body.data.orders')) {
			resolve(new Order(res.body.data.orders[0]))
		}
		else {
			reject(res.body || {})
		}
	}

	_splitSegments (segments) {
		let sortedSegments = clone(segments)
		const routeInfo = this._offer.package['route_info']

		const flights = []
		if (routeInfo.length === 1) {
			flights.push({ segments: sortedSegments })
		}
		else {
			let startIdx = 0

			let segment
			routeInfo.forEach((node) => {
				if (/^\d+$/.test(node[1])) {
					return
				}
				let flight = { segments: [] }
				flights.push(flight)
				do {
					segment = sortedSegments.shift()
					flight.segments.push(segment)
				} while (segment.arrive.airport.metro !== node[1] && sortedSegments.length > 0)
			})

			if (sortedSegments.length > 0) {
				flights.push({ segments: sortedSegments })
			}
		}

		this._flights = flights

		return this._flights
	}

}
