import obc from '@libs/obc'
import { min, max } from 'lodash'
import { Sticky } from '@libs/velcro'
import { createEnhancer } from '@utils/decoract'

import duck from './ducks/index'
import style from './styles/index'

import TravelabMap from '@organisms/TravelabMap'

const enhancer = createEnhancer({
	duck,
	args: {
		paginator: obc.paginator,
	},
	style: style(),
	withLang: true,
})

const calcHeight = () => {
	const w = window
	const d = document
	const e = d.documentElement
	const g = d.getElementsByTagName('body')[0]
	return w.innerHeight|| e.clientHeight|| g.clientHeight
}

const SerpMap = ({ l, $, ditch, state, actions, args, ...props }) => {
	const { paginator } = args

	const { isOpened, enableBoundsFilter, activeOfferId } = state

	const { travelabMap } = ditch.getDitches()

	const { fullScreen } = props

	const { open } = actions

	const offers = paginator.items

	if (offers.length === 0) return null

	const txtOpenMap = l('Открыть карту')

	const renderCurtain = () => {
		return (
			<div className={$.mapCurtain} onClick={() => open()}>
				<div className={$.curtainHint}>{txtOpenMap}</div>
			</div>
		)
	}

	const lats = offers.map((offer) => offer.location[0])
	const longs = offers.map((offer) => offer.location[1])
	const center = {
		lat: (min(lats) + max(lats)) / 2,
		lng: (min(longs) + max(longs)) / 2
	}

	const propsTravelabMap = {
		center,
		activeOfferId,
		markers: offers,
		showMarkers: isOpened,
		enableFilter: enableBoundsFilter,
	}


	const renderMap = (curtain = null) => {
		const inlineStyle = { height: `${state.height || calcHeight()}px` }

		return (
			<div className={$.mapContainer} style={inlineStyle}>
				<TravelabMap {...propsTravelabMap} ditch={travelabMap}/>
				{curtain}
			</div>
		)
	}

	if (fullScreen) {
		propsTravelabMap['showMarkers'] = true
		propsTravelabMap['activeMarkerStyle'] = true

		return renderMap()
	}
	else {
		return (
			<div className={$.sticky}>
				<Sticky>
					{renderMap((!isOpened && renderCurtain()))}
				</Sticky>
			</div>
		)
	}
}

export default enhancer(SerpMap)
