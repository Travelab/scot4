export default function () {

	const holeSizeMod = 10
	const hoveredHoleFactor = 1.2
	const holeSize = 30
	const hoveredHoleSize = holeSize * hoveredHoleFactor

	return {
		sticky: {
			width: '100%'
		},
		mapContainer: {
			flex: 1,
			position: 'relative'
		},

		mapCurtain: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			overflow: 'hidden',
			cursor: 'pointer',

			'&:after': {
				content: '""',
				position: 'absolute',
				borderRadius: '100%',
				width: holeSize,
				height: holeSize,
				boxShadow: {
					x: 0,
					y: 0,
					blur: 50,
					spread: 3000,
					color: 'rgba(0, 0, 0, 0.6)',
				}
			},

			'&:hover:after': {
				width: hoveredHoleSize,
				height: hoveredHoleSize,
				boxShadow: {
					x: 0,
					y: 0,
					blur: 50,
					spread: 3000,
					color: 'rgba(0, 0, 0, 0.3)',
				},
				transition: [
					{
						property: 'width',
						duration: '0.3s'
					},
					{
						property: 'height',
						duration: '0.3s'
					},
					{
						property: 'box-shadow',
						duration: '0.3s',
						timingFunction: 'ease-in-out',
						delay: '0s'
					},
				]
			}
		},

		curtainHint: {
			color: '#FFF',
			fontSize: '1.2em',
			marginTop: holeSize * 2,
			borderBottom: {
				width: 1,
				style: 'dashed',
				color: '#FFF'
			},
			zIndex: 2,
		}
	}
}
