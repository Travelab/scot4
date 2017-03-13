export default function ({ width, height } = {}) {

	return {
		mapContainer: {
			width: width || '100%',
			height: height || '100%'
		}
	}
}
