import { times, random, shuffle, take, sortBy } from 'lodash'

import hotel1 from './hotel1.png'
import hotel2 from './hotel2.png'

const amenities = [
	1, //'swimmingPool',
	11, //'sandyBeach',
	16, //'childrensPlayground',
	17, //'playroom',
	19, //'childrenSwimmingPool',
	20, //'waterPark',
	53, //'spa',
	80, //'freeParking',
	88, //'airConditioning',
	94, //'freeWifi',
]

const images = [hotel1, hotel2]

const offer = {
	currency: 'RUB',
}

const mealTypes = ['RO', 'BB', 'HB', 'FB', 'AI', 'UAI']

const animals = [
	'Armadillo',
	'Bat',
	'Bear',
	'Beaver',
	'Bighorn Sheep',
	'Boar',
	'Bobcat',
	'Buck',
	'American Buffalo',
	'Bull',
	'Cattle',
	'Chicken',
	'Cougar',
	'Coyote',
	'Crow',
	'Deer',
	'Dog',
	'Duck',
	'Eagle',
	'Elk',
	'Fox',
	'Goat',
	'Grizzly bears',
	'Hawk',
	'Horse',
	'Horse',
	'Mule',
	'Owl',
	'Pig',
	'Rabbit',
	'Raccoon',
	'Rattlesnake',
	'Seagull',
	'Sheep',
	'Skunk',
	'Songbird',
	'Vulture',
	'Wolf',
	'Snake',
]

const modifier = 40

export default function ({ count = 2, consist = [1, 0, 0], shaped = true } = {}) {
	if (shaped) {
		return times(
			count,
			() => {
				let sign = Math.random() > 0.5 ? 1 : -1

				return {
					...offer,
					consist,
					id: random(111, 9999),
					hotelName: `Hotel ${take(shuffle(animals), random(1, 3)).join(' ')}`,
					rating: random(4, 9) + random(0, 9) / 10,
					distance: Math.round(random(0.5, 19.9) * 10) / 10,
					commentsCount: random(0, 500),
					roomsCount: random(1, 5),
					refundable: shuffle([true, false])[0],
					stars: random(0, 5),
					mealType: shuffle(mealTypes)[0],
					price: random(20000, 40000),
					location: [
						59.934012 + sign * Math.random() / modifier,
						30.382136 + sign * Math.random() / modifier
					],
					images: shuffle(images),
					amenities: take(shuffle(amenities), random(2, 9))
				}
			}
		)
	}
	else {
		const fares = [{
			book_priority: 50,
			cancellation_policy: {
				refundable: false
			},
			channel: 'clickavia',
			check_book_status_priority: 30,
			details: {
				baggage: {
					checked: { included: 0, weight: 0 },
					hand: { included: 1, weight: 10 },
				},
				consist: [ 1, 0, 0 ],
				meal: { included: false },
				seats_class: 'econom',
			},
			id: "3142448c",
			passenger_reqs: [
				"passport_series",
				"passport_number",
				"passport_validity",
				"citizenship",
				"gender",
				"first_name",
				"last_name",
				"birthday"
			],
			payment_schedule: {
				amount: 5180,
				due_date: "2017-02-15T00:00:00",
				type: "pre-pay"
			},
			price: {
				buyer: 5388,
				currency: 'RUB',
				native: 5180,
				rule: [ '%', { markup: 4 } ],
				supplier: 5180
			},
			service: {
				type: "transfer",
				id: "flight:regular UT-267-201702211750 U6-278-201703031505",
			},
			quantity: 1 // it's a countable property and is contained only includedFares
		}, {
			book_priority: 50,
			cancellation_policy: {
				refundable: true
			},
			channel: 'clickavia',
			check_book_status_priority: 30,
			details: {
				baggage: {
					checked: { included: 1, weight: 23 },
					hand: { included: 1, weight: 10 },
				},
				consist: [ 1, 0, 0 ],
				meal: { included: true },
				seats_class: 'econom',
			},
			id: "3142448b",
			passenger_reqs: [
				"passport_series",
				"passport_number",
				"passport_validity",
				"citizenship",
				"gender",
				"first_name",
				"last_name",
				"birthday"
			],
			payment_schedule: {
				amount: 8000,
				due_date: "2017-02-15T00:00:00",
				type: "pre-pay"
			},
			price: {
				buyer: 8000,
				currency: 'RUB',
				native: 7692,
				rule: [ '%', { markup: 4 } ],
				supplier: 7692
			},
			service: {
				type: "transfer",
				id: "flight:regular SU-120-201702211750 SU-121-201703031505",
			},
			quantity: 1 // it's a countable property and is contained only includedFares
			}
		]

		const segments = [
			{
				fareId: '3142448c',
				aircraft: "Boeing 737-800",
				airline: {
					iata: 'UT',
					logo: 'https://www.clickavia.ru/api/airlines/logo/150/50/gravity=northwest/UT.png',
					title: "UTair"
				},
				arrive: {
					airport: {
						city_title: 'Сочи',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'AER',
						metro: 'AER',
						timezone: 'Europe/Moscow',
						title: 'Сочи'
					},
					city: 'Сочи',
					country: 'россия',
					country_code: 'RU',
					time: '2017-02-21T20:05:00'
				},
				baggage: {
					checked: [],
					unchecked: [ 10 ]
				},
				cabin_class: 'econom',
				consist: [ 1, 0, 0 ],

				depart: {
					airport: {
						city_title: 'Москва',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'VKO',
						metro: 'MOW',
						timezone: 'Europe/Moscow',
						title: 'Внуково'
					},
					city: 'Москва',
					country: 'россия',
					country_code: 'RU',
					time: '2017-02-21T17:50:00'
				},
				flight: '267',
				id: 'UT-267-201702211750',
				meal: false,
				report: [ 'direction:there' ],
				travel_time: 135
			},
			{
				fareId: '3142448c',
				aircraft: "Airbus A321",
				airline: {
					iata: 'U6',
					logo: 'https://www.clickavia.ru/api/airlines/logo/150/50/gravity=northwest/U6.png',
					title: "Ural Airlines"
				},
				arrive: {
					airport: {
						city_title: 'Москва',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'DME',
						metro: 'MOW',
						timezone: 'Europe/Moscow',
						title: 'Домодедово'
					},
					city: 'Москва',
					country: 'россия',
					country_code: 'RU',
					time: '2017-03-03T17:30:00'
				},
				baggage: {
					checked: [],
					unchecked: [ 10 ]
				},
				cabin_class: 'econom',
				consist: [ 1, 0, 0 ],

				depart: {
					airport: {
						city_title: 'Сочи',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'AER',
						metro: 'AER',
						timezone: 'Europe/Moscow',
						title: 'Сочи'
					},
					city: 'Сочи',
					country: 'россия',
					country_code: 'RU',
					time: '2017-03-03T15:05:00'
				},
				flight: '278',
				id: 'U6-278-201703031505',
				meal: false,
				report: [ 'direction:there' ],
				travel_time: 145
			},

			// hub cross
			{
				fareId: '3142448b',
				aircraft: "Boeing 737-800",
				airline: {
					iata: 'SU',
					logo: 'https://www.clickavia.ru/api/airlines/logo/150/50/gravity=northwest/SU.png',
					title: "Aeroflot"
				},
				depart: {
					airport: {
						city_title: 'Пермь',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'PEE',
						metro: 'PEE',
						timezone: 'Asia/Yekaterinburg',
						title: 'Пермь'
					},
					city: 'Пермь',
					country: 'россия',
					country_code: 'RU',
					time: '2017-02-21T08:00:00'
				},
				baggage: {
					checked: [ 23 ],
					unchecked: [ 10 ]
				},
				cabin_class: 'econom',
				consist: [ 1, 0, 0 ],

				arrive: {
					airport: {
						city_title: 'Москва',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'SVO',
						metro: 'MOW',
						timezone: 'Europe/Moscow',
						title: 'Шереметьево'
					},
					city: 'Москва',
					country: 'россия',
					country_code: 'RU',
					time: '2017-02-21T08:00:00'
				},
				flight: '120',
				id: 'SU-120-201702211750',
				meal: false,
				report: [ 'direction:there' ],
				travel_time: 120
			},

			{
				fareId: '3142448b',
				aircraft: "Airbus A321",
				airline: {
					iata: 'SU',
					logo: 'https://www.clickavia.ru/api/airlines/logo/150/50/gravity=northwest/SU.png',
					title: "Aeroflot"
				},
				depart: {
					airport: {
						city_title: 'Москва',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'DME',
						metro: 'MOW',
						timezone: 'Europe/Moscow',
						title: 'Домодедово'
					},
					city: 'Москва',
					country: 'россия',
					country_code: 'RU',
					time: '2017-03-03T23:05:00'
				},
				baggage: {
					checked: [ 23 ],
					unchecked: [ 10 ]
				},
				cabin_class: 'econom',
				consist: [ 1, 0, 0 ],

				arrive: {
					airport: {
						city_title: 'Пермь',
						country: 'RUS',
						country_code: 'RU',
						country_title: 'россия',
						iata: 'PEE',
						metro: 'PEE',
						timezone: 'Asia/Yekaterinburg',
						title: 'Пермь'
					},
					city: 'Пермь',
					country: 'россия',
					country_code: 'RU',
					time: '2017-03-04T03:05:00'
				},
				flight: '121',
				id: 'SU-121-201703031505',
				meal: false,
				report: [ 'direction:there' ],
				travel_time: 120
			},
		]

		return {
			id: "ZDM2MzQwNjgzZDA2NjA2YtjtiQuebD_RRmpfIJRZ2Cay6ORhUGr5W00j1lCIcdV58elhn0tSJ8_CXc8IpsV19x8LfqJRQmCJ6kE68kmyggkcccTjMTHiWYWW45ccZ4Khgtk9yrCpYY-QDwSFGC4KCUtttXMK5wVtViXO5AjJlliKbztEc12Dj7QZoGsD0XJSdbVGfNKLcnutl2IQn6gUY2_J1XR6Rs1-TTfuJsdSf_xyT2nzI6Z7zQAnAPATf4GDvBvS1LM55J56kQ-t95gmFlYWEpVK1brC99FGLhZ6HLhp1wa6AQrU5jpAOzNkKCGuOwr2Y-ipNB342Brq83mgX3Q89ljRoVlPVaYuDyEFrf1SK6x8NOKfNuwYjyamXL9_",
			price: 13388,
			expireAt: new Date(),
			fares: fares,
			includedFares: fares,
			flightFares: fares.slice(0, 2),
			agreements: [
				{ id: 'agr1', title: 'пользовательского соглашения', url: 'https://clickavia.ru' },
				{ id: 'agr2', title: 'еще одного договора', url: 'https://clickavia.ru' },
				{ id: 'agr3', title: 'правила авиаперевозок', url: 'https://clickavia.ru' },
			],
			segments: sortBy(segments, (seg) => (seg.depart.time)),
			flights: [
				{
					segments: [ segments[2], segments[0] ]
				},

				{
					segments: [ segments[1], segments[3] ]
				},
			]
		}
	}
}
