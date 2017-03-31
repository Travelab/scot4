import { last, padStart } from 'lodash'
import confy from '@utils/confy'

import MainView from './views/index.jsx.js'

const CaRouteDescription = (props) => {
	const { offer, channel, isSuccessMsg } = props

	const firstSegment = offer.flights[0].segments[0]
	const lastSegment = last(offer.flights).segments[0]

	const cabinClass = firstSegment['cabin_class']
	const { city: src, airport: srcAirport } = firstSegment.depart
	const { city: dst, airport: dstAirport } = last(offer.flights[0].segments).arrive
	const consist = firstSegment.consist

	// prepare inboundDate and outboundDate
	const localOutboundDate = new Date(firstSegment.depart.time + 'Z')
	const outboundDate = new Date(localOutboundDate.getUTCFullYear(), localOutboundDate.getUTCMonth(), localOutboundDate.getUTCDate(), localOutboundDate.getUTCHours(), localOutboundDate.getUTCMinutes())
	const localInboundDate = offer.flights.length > 1 ? new Date(lastSegment.depart.time + 'Z') : null
	const inboundDate = localInboundDate && new Date(localInboundDate.getUTCFullYear(), localInboundDate.getUTCMonth(), localInboundDate.getUTCDate(), localInboundDate.getUTCHours(), localInboundDate.getUTCMinutes())

	// prepare workingYears and paxCount
	const workingYears = (new Date()).getFullYear() - confy.get('CONTACTS.clickavia').foundationYear
	const hour = 60 * 60 * 1000 // 60 * min. {min} = 60 * sec. {sec} = 1000
	const baseDate = new Date(2016, 10, 11)
	const currentDate = new Date()
	const basePaxCount = 212687
	const paxRatePerHour = 5
	const paxCount = Math.floor(((currentDate - baseDate) / hour) * paxRatePerHour) + basePaxCount

	// prepare all variants URL params
	const srcParam = srcAirport.metro
	const dstParam = dstAirport.metro
	const outboundDateParam = outboundDate.getFullYear()
		+ '-' + padStart((outboundDate.getMonth() + 1), 2, '0')
		+ '-' + padStart(outboundDate.getDate(), 2, '0')
	const inboundDateParam = inboundDate
		? inboundDate.getFullYear()
			+ '-' + padStart((inboundDate.getMonth() + 1), 2, '0')
			+ '-' + padStart(inboundDate.getDate(), 2, '0')
		: '_'
	const consistParam = consist.join('/')
	const allVarUrlParam = srcParam + '/' + dstParam + '/'
		+ outboundDateParam + '/' + inboundDateParam + '/' + consistParam

	const propsMainView = {
		workingYears,
		paxCount,
		src,
		dst,
		inboundDate,
		outboundDate,
		consist,
		cabinClass,
		allVarUrlParam,
		channel,
		isSuccessMsg
	}

	return <MainView {...propsMainView}/>
}

export default CaRouteDescription
