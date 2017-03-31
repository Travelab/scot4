import GoogleMap from 'google-map-react'
import { createEnhancer } from '@utils/decoract'

import duck from './ducks'
import style from './styles'
import mapStyles from './gmap_styles'
import MapMarker from '@organisms/MapMarker'

const enhancer = createEnhancer({
	duck,
	style: style(),
	withLang: true
})

const TravelabMap = ({ $, l, state, actions, ...props }) => {

	const { activeOfferId, showMarkers, markers, center, zoom, enableFilter, activeMarkerStyle } = props

	const initMapOptions = (map) => {
		return {
			mapTypeId: map.MapTypeId.ROADMAP,
			styles: mapStyles(),
			zoomControlOptions: {
				position: map.ControlPosition[activeMarkerStyle ? 'RIGHT_TOP' : 'LEFT_TOP'],
				style: map.ZoomControlStyle.SMALL
			}
		}
	}

	const onChange = (map) => {
		actions.setBounds({ enableFilter, ...map })
	}

	const renderMarkers = () => {

		const { openedOfferId } = state

		return markers.map((marker, index) => {

				let isActive = activeMarkerStyle || marker.id === activeOfferId
				let isOpened = marker.id === openedOfferId
				let propsMapMarker = {
					isOpened,
					isActive,
					key: marker.id,
					lat: marker.location[0],
					lng: marker.location[1],
					offer: marker,
					onToggleBalloon: actions.toggleOfferVisibility,
				}

				return (
					<MapMarker {...propsMapMarker}/>
				)
			})
	}

	const apiKey = 'AIzaSyCxOMn5biAYBcfc4sc-z0vxtuUsNX2sC-w'
	const bootstrapURLKeys = {
		key: apiKey,
		language: l.l
	}
	const propsGoogleMap = {
		onChange,
		bootstrapURLKeys,
		experimental: true,
		options: initMapOptions,
		defaultZoom: zoom,
		center: state.center || center,
	}

	return (
		<div className={$.mapContainer}>
			<GoogleMap {...propsGoogleMap}>
				{showMarkers && markers && renderMarkers()}
			</GoogleMap>
		</div>
	)

}

TravelabMap.defaultProps = {
	center: { lat: 59.938043, lng: 30.337157 },
	language: 'ru',
	zoom: 11,
	showMarkers: true,
	activeOfferId: null
}

export default enhancer(TravelabMap)
