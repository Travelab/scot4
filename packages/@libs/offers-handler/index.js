import Offer from '@libs/offer'
import { values } from 'lodash'

export default class {
	constructor () {
		this._offers = {}
		this._segments = {}
		this._fares = {}
		this._agreements = {}
		this._airports = {}
		this._hotels = {}
		this._activities = {}
		this._airlines = {}
		this._airports = {}
		this._services = {}
		this._brands = {}
		this._packages = {}
	}

	get offers () {
		return values(this._offers).map((offer) => (new Offer(offer)))
	}

	process (data) {
		this._addItems('_brands', data.brands)
		this._addItems('_airlines', data.airlines, 'iata')
		this._addItems('_airports', data.airports, 'iata')
		this._addItems('_agreements', data.agreements)
		this._addItems('_hotels', data.hotels, '_id')
		this._addItems('_packages', data.packages)

		this._addSegments(data.segments || [])
		this._addActivities(data.activities || [])
		this._addServices(data.services || [])
		this._addFares(data.fares || [])
		this._addOffers(data.offers || [])
	}

	_addItems (store, items, key = 'id') {
		if (!items) return null

		items.forEach((item) => {
			this[store][item[key]] = item
		})
	}

	_addSegments (segments) {
		segments.forEach((segment) => {
			segment.airline = this._airlines[segment.airline]
			segment.depart.airport = this._airports[segment.depart.airport]
			segment.arrive.airport = this._airports[segment.arrive.airport]
			this._segments[segment.id] = segment
		})
	}

	_addActivities (activities) {
		activities.forEach((activity) => {
			if ('segments' in activity) {
				activity.segments = activity.segments.map((segmentId) => this._segments[segmentId])
			}
			else if ('hotel' in activity) {
				activity.hotel = this._hotels[activity.hotel]
			}
			this._activities[activity.id] = activity
		})
	}

	_addServices (services) {
		services.forEach((service) => {
			service.activities = service.activities.map((activityId) => this._activities[activityId])
			this._services[service.id] = service
		})
	}

	_addFares (fares) {
		fares.forEach((fare) => {
			fare.agreement = fare.agreement.map((agreementId) => this._agreements[agreementId])
			fare.service = this._services[fare.service]
			this._fares[fare.id] = fare
		})
	}

	_addOffers (offers) {
		offers.forEach((offer) => {
			offer.fares = offer.fares.map((fareId) => this._fares[fareId])
			offer.package = this._packages[offer.package]
			this._offers[offer.id] = offer
		})
	}
}
