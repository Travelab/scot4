export default function ({ width = 16, height = 16 } = {}) {
	const baloonWidth = 250

	let arrowStyle = {
		bottom: '100%',
		left: 225,
		border: {
			style: 'solid',
			color: 'transparent'
		},
		content: '" "',
		height: '0',
		width: 0,
		position: 'absolute',
		pointerEvents: 'none'
	}

	return {
		tooltipContent: {
			backgroundColor: 'white',
			display: 'flex',
			width: baloonWidth,
			position: 'relative',
			left: -225,
			top: -10,
			justifyContent: 'space-between',
			borderRadius: 5,
			boxShadow: {
				x: 0,
				y: 0,
				blur: 4,
				spread: -1,
				color: 'rgba(0, 0, 0, 0.3)'
			},
			zIndex: 3,

			'&:before': {
				extend: arrowStyle,
				borderColor: 'transparent',
				borderBottomColor: '#FFF',
				borderWidth: 6,
				marginLeft: -6
			},

			'&:after': {
				extend: arrowStyle,
				borderColor: 'transparent',
				borderBottomColor: '#FFF',
				borderWidth: 5,
				marginLeft: -5
			}
		},

		activeTooltipContent: {
			extend: 'tooltipContent',
			top: -19
		},

		crossContainer: {
			width,
			height,
			cursor: 'pointer',
			display: 'block',
			pointerEvents: 'auto',
			position: 'absolute',
			left: baloonWidth - width / 2 - 1,
			top: -width / 2 + 1,
			backgroundColor: 'black',
			borderRadius: 10,
			padding: 2
		},
		cross: {
			'& svg': {
				'& path': {
					fill: '#FFF',
				}
			}
		}
	}
}
