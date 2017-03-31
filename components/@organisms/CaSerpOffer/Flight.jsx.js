import { createEnhancer } from '@utils/decoract'
import style from './styles/Flight.js'
import Tooltip from '@atoms/Tooltip'


const enhancer = createEnhancer({
	style,
})

const TimelinePoint = ({ txtTooltip, swtch, id }) => {
	const { offset } = swtch

	return (
		<Tooltip content={txtTooltip} placement="top">
			<li style={{ left: `${offset * 100}%` }}/>
		</Tooltip>
	)
}

const AirportLabel = ({ airport }) => (
	<span title={airport.title}>{airport.iata}</span>
)

const Flight = ({ $, l, route }) => {

	const { start, end, swtches, totalTime } = route
	const timeStart = l.time(new Date(start.time))
	const timeEnd = l.time(new Date(end.time))

	const txtTotalD = l('Д')
	const txtTotalH = l('Ч')
	const txtTotalM = l('М')

	const renderSwtches = () => (swtches.map((swtch, key) => {
								
		const { waitingTime, airport } = swtch

		const txtDays = l('{d}д', waitingTime)
		const txtHours = l('{h}ч', waitingTime)
		const txtMins = l('{m}м', waitingTime)

		const txtTooltip = l('Пересадка {waitingTime} в аэропорту “{airport}” {country}', {
			waitingTime: `${waitingTime.d ? txtDays : ''} ${txtHours} ${txtMins}`,
			airport: airport.title,
			country: airport.country_title,
		})

		return <TimelinePoint swtch={swtch} key={key} id={key} txtTooltip={txtTooltip}/>
	}))

	return (
		<div className={$.flight}>
			<div className={$.flightSwtches}>
				<div className={$.times}>
					<span>{timeStart}</span>
					<span>{timeEnd}</span>
				</div>
				<div className={$.route}>
					<AirportLabel airport={start.airport}/>
					<ul className={$.timeline}>
						{renderSwtches()}
					</ul>
					<AirportLabel airport={end.airport}/>
				</div>
			</div>
			<div className={$.timeTotal}>
				{!!totalTime.d && (<span>{totalTime.d}<sup>{txtTotalD}</sup></span>)}
				{!!totalTime.h && (<span>{totalTime.h}<sup>{txtTotalH}</sup></span>)}
				{<span>{totalTime.m}<sup>{txtTotalM}</sup></span>}
			</div>
		</div>
	)
}


export default enhancer(Flight)
