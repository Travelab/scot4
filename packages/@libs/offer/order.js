import request from 'superagent'
import confy from '@utils/confy'


export default class {
	constructor (rawOrder) {
		this._order = rawOrder
	}

	get id () {
		return this._order.id
	}

	get status () {
		return this._order.status
	}

	get paymentStatus () {
		return this._order['payment_status']
	}

	get canPay () {
		return this.status === 'AVAIL' && this.paymentStatus === 'UNPAID'
	}

	// data example:
	//
	// {
	// 	"return_url": "/pay",
	// 	"email": "mail@example.com",
	// 	"phone": "+79261232323",
	// 	"card_data": {
	// 		"pan": "4111111111100023",
	// 		"cardholder": "ANYBODY",
	// 		"valid_month": "08",
	// 		"valid_year": "18",
	// 		"cvv": "123"
	// 	},
	// 	"personal_data": [
	// 		{
	// 			"category" : "adult",
	// 			"first_name" : "MARINA",
	// 			"last_name" : "VESELOVA",
	// 			"citizenship" : "RUS",
	// 			"gender" : "female",
	// 			"passport_series" : "73",
	// 			"passport_type" : "travel-passport",
	// 			"birthday" : "1962-04-13",
	// 			"is_incomplete" : false,
	// 			"passport_validity" : "2024-01-13",
	// 			"passport_number" : "1938217"
	// 		},
	// 	]
	// }
	//
	// response example:
	// SUCCESS:
	// {
	//	"meta": null,
	//	"status": "BOOKING"
	// }
	// ERROR:
	// {
	//	"meta": {
	//		"reason": "cant_change_passengers_while_booking"
	//	},
	//	"status": "ERROR"
	// }
	book (data) {
		if (this.canPay) {
			const url = confy.get('API.cl.book').replace(':orderId', this.id)
			data['return_url'] = confy.get('API.cl.payReturnUrl')
				.replace(':offerId', this._order.offer)
				.replace(':orderId', this.id)
			return request.post(url).send(data)
		}
		else {
			return false
		}
	}

	confirm () {
		const url = confy.get('API.cl.book').replace(':orderId', this.id)
		return request.post(url)
	}
}
