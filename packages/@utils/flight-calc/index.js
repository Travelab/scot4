import { uniqBy, last, head } from 'lodash'
import tz from 'timezone/loaded'

/*
	дает из точки UNIX timestamp в миллисекундах с учетом таймзоны
	вспомогательный метод
*/
const getTime = ({ time, airport }) => (
	tz(time, airport.timezone)
)




/*
	дает объект из дней, часов, минут из временной дельты в миллисекундах
	вспомогательный метод
*/
const getDhm = (delta) => {
	let d = delta / 1000
	const r = {}      // result
	const s = {       // structure
		d: 86400,
		h: 3600,
		m: 60,
	}

	Object.keys(s).forEach(key => {
		r[key] = Math.floor(d / s[key])
		d -= r[key] * s[key]
	})

	return r
}


/*
	по массиву сегментов полета считает общее время маршрута, 
	вычисляет пересадки, время ожидания и еще кое-что
*/
export const calculateRoute = (segments) => {

	const [ start, end ] = [ head(segments).depart, last(segments).arrive ]
	const [ transferStart, transferEnd ] = [ getTime(start), getTime(end) ]
	const totalTime = transferEnd - transferStart

	const route = {
		totalTime: getDhm(totalTime),
		swtches: [],
		start,
		end
	}

	route.swtches = segments.reduce((swtches, segment, index, sgmnts) => {
		const nextSegment = sgmnts[index + 1]

		if (!nextSegment) {
			return swtches
		}

		const nextDepartTime = getTime(nextSegment.depart)
		const arriveTime = getTime(segment.arrive)

		return [
			...swtches,
			{
				airport: segment.arrive.airport,
				offset: (nextDepartTime - transferStart) / totalTime,
				waitingTime: getDhm(nextDepartTime - arriveTime)
			}
		]
	}, [])

	return route
}


/* 
	получает все уникальные авиалинии по сегментам полета
*/
export const getAirlines = (segments) => (
	uniqBy(segments.map(({ airline }) => airline), 'iata')
)


/*
	получает минимальный вес багажа по сегментам
*/
export const getBaggageWeight = (segments) => (
	Math.min(...segments.map(({ baggage }) => baggage.length ? Math.min(...baggage.checked) : 0))
)

