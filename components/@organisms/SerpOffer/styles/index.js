import theme from 'themes/default.js'


export default ({ height = 175 } = {}) => {

	return {
		container: {
			height,
			width: '100%',
			display: 'flex',
			backgroundColor: 'white',
			borderRadius: theme.serpRadius,

			'&:hover': {
				boxShadow: {
					x: 0,
					y: 0,
					blur: 25,
					spread: 0,
					color: 'rgba(0, 0, 0, 0.3)',
				}
			}
		},

		gallery: {
			width: 270
		},

		info: {
			width: 470
		},

		narrowContainer: {
			position: 'relative',
			width: '100%',
			borderBottom: {
				width: 1,
				color: 'white',
				style: 'solid'
			}
		},
		wrap: {
			pointerEvents: 'none',
			position: 'absolute',
			bottom: 0,
			zIndex: 10,
			width: '100%'
		}

	}
}
