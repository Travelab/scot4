import { get, findIndex, last, compact } from 'lodash'
import { createEnhancer } from '@utils/decoract'
import tz from 'timezone/loaded'

import Header from './Header.jsx.js'
import Segment from './Segment.jsx.js'
import Transfer from './Transfer.jsx.js'
import TicketGroup from './TicketGroup.jsx.js'
import TariffRules from './TariffRules.jsx.js'

import OverlayWrapper from '@molecules/OverlayWrapper'

import duck from './ducks/index.js'
import style from './styles/index.js'

const cq = {
	t414: {
		maxWidth: 414
	}
}

const enhancer = createEnhancer({
	duck,
	style,
	cq,
})

function decorateDuration (l, mins) {
	const hour = 60
	const day = 24 * hour

	const days = Math.floor(mins / day)
	const hours = Math.floor((mins - days * day) / hour)
	const minutes = mins - days * day - hours * hour

	const txtDays = days === 0 ? null : l(`{days, plural,
		one {{days} день}
		few {{days} дня}
		many {{days} дней}
	}`, { days })
	const txtHours = hours === 0 ? null : l(`{hours, plural,
		one {{hours} час}
		few {{hours} часа}
		many {{hours} часов}
	}`, { hours })
	const txtMinutes = minutes === 0 ? null : l(`{minutes, plural,
		one {{minutes} минута}
		few {{minutes} минуты}
		many {{minutes} минут}
	}`, { minutes })

	return compact([ txtDays, txtHours, txtMinutes ]).join(' ')
}

function formatSegmentPart (l, segPart, fareDepartMetro) {
	const localSegTime = new Date(segPart.time + 'Z')
	const segTime = new Date(localSegTime.getUTCFullYear(), localSegTime.getUTCMonth(), localSegTime.getUTCDate(), localSegTime.getUTCHours(), localSegTime.getUTCMinutes())
	let time = l('{segTime, time, short}', { segTime })
	if (time.length < 5) time = `0${time}`

	return {
		time,
		date: l('{segTime, date, shortMonth}', { segTime }),
		airport: {
			name: segPart.airport.title,
			city: segPart.city,
			code: segPart.airport.iata,
			metro: fareDepartMetro
		},
	}
}

function calcPropsHeader (l, offer, idx, segments, directionColor) {
	const txtThere = l('Туда')
	const txtBack = l('Обратно')

	let label
	if (offer.flights.length < 3) {
		label = idx === 0 ? txtThere : txtBack
	}

	const src = segments[0].depart
	const departTime = tz(src.time, src.airport.timezone)
	const dst = last(segments).arrive
	const arriveTime = tz(dst.time, dst.airport.timezone)
	const travelTime = (arriveTime - departTime) / 60000

	return {
		meta: { directionColor },
		data: {
			label,
			direction: `${src.city} — ${dst.city}`,
			time: decorateDuration(l, travelTime),
		}
	}
}

function calcPropsSegment (l, idx, segments, directionColor, warnColor, segment, arriveIata) {
	const segSize = segments.length - 1
	const segSrc = segment.depart
	const segDst = segment.arrive
	const nextSegSrc = idx < segSize ? segments[idx + 1].depart : null
	const prevSeg = idx > 0 ? segments[idx - 1] : null
	let fareDepartMetro = segSrc.airport.metro
	if (prevSeg && prevSeg.fareId === segment.fareId) {
		fareDepartMetro = prevSeg.depart.airport.metro
	}

	return {
		meta: {
			id: segment.id,
			groupId: segment.fareId,
			bySections: {
				depart: {
					timeColor: idx === 0 ? directionColor : null,
					airportColor: idx > 0 && segSrc.airport.iata !== arriveIata ? warnColor : null,
					hideDate: true,
				},
				arrive: {
					timeColor: idx === segSize ? directionColor : null,
					airportColor: nextSegSrc && segDst.airport.iata !== nextSegSrc.airport.iata ? warnColor : null,
					hideDate: true,
				},
			}
		},
		data: {
			depart: formatSegmentPart(l, segSrc, fareDepartMetro),
			arrive: formatSegmentPart(l, segDst),
			flightId: `${segment.airline.iata}-${segment.flight}`,
			duration: decorateDuration(l, segment['travel_time']),
			aircraft: segment.aircraft,
			airline: {
				name: segment.airline.title,
				code: segment.airline.iata,
			},
			baggage: segment.baggage,
			type: segment.type
		}
	}
}

function calcPropsLayover(l, segments, segment, idx) {
	if (idx > 0) {
		const prevSeg = segments[idx - 1]

		const txtLayoverTitle = l(`${segment.depart.city}`)

		let txtHint = null
		if (segment.depart.airport.iata != prevSeg.arrive.airport.iata) {
			txtHint = l('Разные аэропорты прилета и вылета')
		}

		const arriveTime = new Date(prevSeg.arrive.time)
		const departTime = new Date(segment.depart.time)

		return {
			id: `layover${idx}`,
			title: txtLayoverTitle,
			hint: txtHint,
			duration: decorateDuration(l, Math.floor((departTime - arriveTime) / 60000))
		}
	}
	else {
		return null
	}
}

function splitByTicketsGroups (propsSegments, propsLayovers) {
	let currentGroup = []
	const groups = [ currentGroup ]

	propsSegments.forEach((segment, idx) => {
		const propsLayover = idx > 0 ? propsLayovers.shift() : null

		if (currentGroup.length > 0 && last(currentGroup).meta.groupId != segment.meta.groupId) {
			if (propsLayover) groups.push([ propsLayover ])

			currentGroup = []
			groups.push(currentGroup)
		}
		else if (propsLayover) {
			currentGroup.push(propsLayover)
		}
		currentGroup.push(segment)
	})

	return groups
}

const OrderTicketsInfo = ({ $, l, cq, state, actions, ditch, ...props }) => {

	const { t414 } = cq
	const { isOpenedTariffRules, tariffRulesIdx } = state

	const { openTariffRules, closeTariffRules } = actions

	const { offer } = props

	const colors = {
		there: '#128e3f',
		back: '#b41ab7',
		warn: '#be0004',
	}

	const fareIds = offer.flightFares.map((fare) => (fare.id))

	const flights = offer.flights.map((flight, idx) => {
		const segments = flight.segments
		const directionColor = idx === 0 ? colors.there : colors.back

		const propsHeader = calcPropsHeader(l, offer, idx, segments, directionColor)

		let arriveIata
		const propsSegments = segments.map((segment, segIdx) => {
			const propsSegment = calcPropsSegment(l, segIdx, segments, directionColor, colors.warn, segment, arriveIata)
			arriveIata = segment.arrive.airport.iata
			return {
				...propsSegment,
				onShowRulesClick: openTariffRules
			}
		})

		const propsLayovers = compact(segments.map((segment, segIdx) => (
			calcPropsLayover(l, segments, segment, segIdx)
		)))

		const ticketGroups = splitByTicketsGroups(propsSegments, propsLayovers)

		const renderedGroups = ticketGroups.map((group, gid) => {
			const items = group.map((propsItem, i) => (
				propsItem.meta
					? <Segment key={`s${i}`} {...propsItem} t414={t414}/>
					: <Transfer key={`t${i}`} {...propsItem} t414={t414}/>
			))

			return (
				<TicketGroup key={`group${idx}-${gid}`} groupId={fareIds.indexOf(get(group[0], 'meta.groupId'))}>
					{items}
				</TicketGroup>
			)
		})

		return (
			<div key={`wrap${idx}`}>
				<TicketGroup key={`groupHeader${idx}`}>
					<Header {...propsHeader} t414={t414} key={`header${idx}`}/>
				</TicketGroup>
				{renderedGroups}
			</div>
		)
	})

	const renderedFlights = []
	flights.forEach((flight, idx) => {
		if (idx > 0) {
			renderedFlights.push(
				<hr className={$.hr} key={`hr${idx}`}/>
			)
		}
		renderedFlights.push(flight)
	})

	const containerClass = t414 ? $.t414Container : $.container

	let PopUp = () => (null)
	if (isOpenedTariffRules) {
		const propsTariffRules = {
			condition: offer.getConditions(tariffRulesIdx),
			closeHandler: closeTariffRules
		}
		PopUp = () => (
			<OverlayWrapper height={'100%'} onClose={closeTariffRules}>
				<TariffRules {...propsTariffRules}/>
			</OverlayWrapper>
		)
	}

	return (
		<div className={containerClass}>
			{renderedFlights}
			<PopUp/>
		</div>
	)
}

export default enhancer(OrderTicketsInfo)
