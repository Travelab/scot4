import { createEnhancer } from '@utils/decoract'
import { calculateRoute, getAirlines, getBaggageWeight } from '@utils/flight-calc'

import style from './styles/index.js'
import BaggageIcon from './BaggageIcon.jsx.js'
import Flight from './Flight.jsx.js'
import AirlineImg from './AirlineImg.jsx.js'


const enhancer = createEnhancer({
	style
})

const CaSerpOffer = ({ $, l, ...props }) => {

	const { offer, mobile = false } = props

	const { segments, flights, price, color } = offer

	const airlines = getAirlines(segments)
	const baggage = getBaggageWeight(segments)
	const txtPrice = l.currency(price)

	const headerStyle = color ? { backgroundColor: color } : {}
	
	const isSingleAirline = airlines.length === 1
	const propsAirlineImg = {
		square: !isSingleAirline,
		width: isSingleAirline ? 70 : 28,
	}

	return (
		<div className={mobile ? $.mobileContainer : $.container}>
			<div className={$.header} style={headerStyle}>
				<ul className={$.airlines}>
					{airlines.map((airline) => (
						<li className={$.airline} key={airline.iata}>
							<AirlineImg {...airline} {...propsAirlineImg}/>
						</li>
					))}
				</ul>
				<BaggageIcon weight={baggage}/>
			</div>
			<div>
				{flights.map((flight, key) => 
					<Flight key={key} route={calculateRoute(flight.segments)}/>
				)}
			</div>
			<div className={$.footer}>
				{txtPrice}
			</div>
		</div>
	)
}

export default enhancer(CaSerpOffer)
