import { createEnhancer } from '@utils/decoract'

import { calculateRoute, getAirlines, getBaggageWeight } from '@utils/flight-calc'

import style from './styles/index.js'
import BaggageIcon from './BaggageIcon.jsx'
import Flight from './Flight.jsx'
import AirlineImg from './AirlineImg.jsx'


const enhancer = createEnhancer({
	style
})


const CaSerpOffer = ({ $, l, ...props }) => {

	const { offer } = props

	// offer.type can be cheap, optimal, straight
	const { segments, flights, price, type = 'default' } = offer

	const airlines = getAirlines(segments)
	const baggage = getBaggageWeight(segments)
	const txtPrice = l.currency(price)

	return (
		<div className={$.container}>
			<div className={`${$.header} ${$[type]}`}>
				<ul className={$.airlines}>
					{airlines.map(airline => (
						<li className={$.airline} key={airline.iata}>
							<AirlineImg {...airline} />
						</li>
					))}
				</ul>
				<BaggageIcon weight={baggage} />
			</div>
			<div>
				{flights.map((flight, key) => 
					<Flight key={key} route={calculateRoute(flight.segments)} />
				)}
			</div>
			<div className={$.footer}>
				{txtPrice}
			</div>
		</div>
	)
}

export default enhancer(CaSerpOffer)
