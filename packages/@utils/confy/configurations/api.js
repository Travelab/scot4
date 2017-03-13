import protocol from '../switchers/protocol.js'
import env from '../switchers/env.js'

export default {
	cl: {
		channel: 'clickavia',
		offer: env({
			default: '/api/offer',
			dev: 'https://newapi-staging.travelab.com/offer'
		}),
		order: env({
			default: '/api/order',
			dev: 'https://newapi-staging.travelab.com/order'
		}),
		book: env({
			default: '/api/order/:orderId/book',
			dev: 'https://newapi-staging.travelab.com/order/:orderId/book'
		}),
		payReturnUrl: env({
			default: 'http://new-ca.travelab.com/offer/:offerId?order_id=:orderId',
			dev: '/offer/:offerId?order_id=:orderId'
		}),
	},
	tl: {
		search: env({
			default: 'https://api-staging.travelab.com:8890/search'
		}),
	},
	geo: {
		locations: env({
			default: '//geo.clickavia.ru/locations'
		}),
	},

	// Example of rich use for utils/sourcer
	/*main: {
		protocol: protocol(),
		host: env({
			default: 'api-staging.travelab.com:8890',
			mock: 'localhost:8080',
		}),
		endpoints: {
			search: 'SSE /search?:coreQuery&:extraQuery',
		},
	},
	geo: {
		protocol: protocol(),
		host: 'geo.clickavia.ru',
		endpoints: {
			locations: 'GET /locations',
		},
	},*/
}
