import { createEnhancer } from '@utils/decoract'

import duck from './ducks/index'
import style from './styles/index'

import SerpMap from '@ecosystems/SerpMap'
import SerpOffersViewer from '@ecosystems/SerpOffersViewer'

const cq = {
	t959: {
		maxWidth: 959,
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	style: style(),
	withLang: false
})

const SerpSearchResults = ({ $, cq, ditch, ...props }) => {
	const { isOffersListActivated, isMapActivated } = props
	const { serpOffersViewer, serpMap } = ditch.getDitches()

	const { t959 } = cq

	const renderSerpOffersViewer = () => (
		<div className={t959 ? $.narrowOffers : $.offers}>
			<SerpOffersViewer ditch={serpOffersViewer} squareStyle={t959}/>
		</div>
	)

	const renderSerpMap = () => (
		<SerpMap ditch={serpMap} fullScreen={t959}/>
	)

	return (
		<div className={$.container}>
			{isOffersListActivated && renderSerpOffersViewer()}
			{isMapActivated && renderSerpMap()}
		</div>
	)
}

SerpSearchResults.defaultProps = {
	isOffersListActivated: true,
	isMapActivated: true
}

export default enhancer(SerpSearchResults)
