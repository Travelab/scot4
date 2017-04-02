import request from 'superagent'
import confy from '@utils/confy'

const testSuggestions = [ 
	{
		title: 'Тольятти',
		kind: 'locality',
		id: 1234
	},
	{
		title: 'Самара',
		kind: 'locality',
		id: 2345
	},
	{
		title: 'Чита',
		kind: 'locality',
		id: 3456
	},
	{
		title: 'Томск',
		kind: 'locality',
		id: 4567
	},
	{
		title: 'Бали',
		kind: 'locality',
		id: 5678
	}
]

let fetchSuggestionsReq = null

const fetchSuggestions = (value) => {
	/*	let timer = null

	return new Promise((res, rej) => {
		timer = setTimeout(() => res(testSuggestions), 300)
	})
	.catch((reason) => clearTimeout(timer))*/
	fetchSuggestionsReq && fetchSuggestionsReq.abort()

	const geoAPI = confy.get('API.geo.locations')

	fetchSuggestionsReq = request
		.get(geoAPI)
		.query({ term: value })

	return fetchSuggestionsReq
}

export default {
	fetchSuggestions
}
