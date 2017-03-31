const activatedContainerScale = 5

export default function ({ itemHeight = 50 }) {

	const componentPadding = itemHeight / 4
	const minWidth = itemHeight * 2.92

	return {
		container: {
			display: 'flex',
			flexFlow: 'row wrap',
			display: 'inline-flex',
			position: 'relative',
			background: 'white',
			boxSizing: 'border-box',
			// minWidth: minWidth,
			width: '100%',
			padding: componentPadding / 2,
			paddingRight: itemHeight / 3,
			cursor: 'pointer'
		},

		activatedContainer: {
			extend: 'container',
			boxShadow: {
				x: 5,
				y: 5,
				blur: 8,
				spread: 1,
				color: 'rgba(0,0,0,.75)'
			},
			zIndex: 1,
			outline: {
				width: activatedContainerScale,
				style: 'solid',
				color: 'white'
			}
		},

		containerWithSeparator: {
			// extend: 'container',

			'&:after': {
				content: 'close-quote',
				position: 'absolute',
				top: 0,
				right: 0,
				bottom: 0,
				width: 1,
				background: '#ccc'
			}
		},

		invalidContainer: {
			boxShadow: 'inset 0px 0px 4px 4px rgba(255,85,85,0.5)'
		},

		item: {
			display: 'inline-flex',
			flexWrap: 'nowrap',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: itemHeight / 3 - 2,
			color: '#444',
			padding: componentPadding / 2,

			'& img': {
				marginRight: 7,
				height: itemHeight / 2
			}
		}
	}
}

