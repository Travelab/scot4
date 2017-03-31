import MainView from './views/index.jsx.js'

const CaExplanatory = (props) => {
	const { offer, isOrderReady } = props

	const propsView = {
		suppliersCount: offer.flightFares.length,
		price: offer.price,
		ticketsType: offer.ticketsType,
		isOrderReady
	}

	return <MainView {...propsView}/>
}

export default CaExplanatory
