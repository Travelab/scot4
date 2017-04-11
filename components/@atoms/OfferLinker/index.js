import { createEnhancer } from '@utils/decoract'
import { map, each, pick, zipObject } from 'lodash'
import obc from '@libs/obc'

import style from './styles/index'


const enhancer = createEnhancer({
	style,
	args: {
		getFilter: obc.getFilter,
	},
	withLang: false,
})

const OfferLinker = ({ $, args, ...props }) => {
	const { getFilter } = args
	const { offerId, children } = props

	const filter = getFilter()

	let queryParams = {
		source: 'serp',
		departDateRange: 0,
		returnDateRange: 0
	}

	const paramsMap = {
		src: 'departCity',
		dst: 'destinCity'
	}

	each(
		pick(filter, ['src', 'dst', 'departDate', 'returnDate']),
		(value, key) => {
			queryParams[paramsMap[key] || key] = value
		}
	)

	if (filter.consist) {
		queryParams = Object.assign(
			queryParams,
			zipObject(['adults', 'children', 'infants'], filter.consist)
		)
	}

	const strQueryParams = map(queryParams, (param, key) => (`${key}=${param}`)).join('&')

	const url = `https://travelab.com/order/${offerId}?${strQueryParams}`

	return (
		<a href={url} target='_blank' className={$.offerLink}>
			{children}
		</a>
	)
}

export default enhancer(OfferLinker)
