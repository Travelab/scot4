import theme from 'themes/default'


export default () => {
	const disabled = {
		borderColor: theme.colors.gray,
		color: theme.colors.gray,
		cursor: 'auto'
	}

	const arrowStyle = {
		top: '100%',
		left: '50%',
		border: {
			style: 'solid',
			color: 'transparent'
		},
		content: '" "',
		height: 0,
		width: 0,
		position: 'absolute',
		pointerEvents: 'none'
	}

	const borderColor = '#000'
	const borderOpacityColor = 'rgba(0, 0, 0, 0)'
	const backgroundColor = '#FFF'
	const backgroundOpacityColor = 'rgba(255, 255, 255, 0)'
	const border = {
		width: 1,
		style: 'solid',
		color: borderColor
	}

	return {
		pagination: {
			display: 'flex',
			justifyContent: 'center',

			'& ul': {
				listStyle: 'none'
			},

			'& li': {
				display: 'block',
			},
			'& a': {
				cursor: 'pointer',
				padding: [5, 8],
				border: {
					width: 1,
					style: 'solid',
					color: 'black'
				}
			},

			'& .previous > a': {
				marginRight: 10
			},

			'& .previous.disabled > a': {
				extend: disabled
			},

			'& .next > a': {
				marginLeft: 10
			},

			'& .next.disabled > a': {
				extend: disabled
			},

			'& .break': {
				cursor: 'auto'
			},

			'& .selected > a': {
				backgroundColor: theme.colors.activeOffer,
				color: 'white',
				cursor: 'auto'
			}
		},

		mobileContainer: {
			width: '100%',
			position: 'relative'
		},
		pointer: {
			width: 54,
			height: 54,
			borderRadius: 60,
			margin: [ 5, 'auto', 20, 'auto' ],
			textAlign: 'center',
			fontSize: 14,
			padding: 3,
			cursor: 'pointer',
			color: 'white',
			backgroundColor: '#72c3fc',
		},
		pagesPad: {
			width: '100%',
			position: 'absolute',
			top: '-3.5em',
			zIndex: 20
		},
		pages: {
			margin: [ 10, 'auto' ],
			maxWidth: 300,
			display: 'flex',
			position: 'relative',
			backgroundColor: backgroundColor,
			border: border,
			borderRadius: theme.serpRadius,

			'&:before': {
				extend: arrowStyle,
				borderColor: borderOpacityColor,
				borderTopColor: borderColor,
				borderWidth: 11,
				marginLeft: -11
			},

			'&:after': {
				extend: arrowStyle,
				borderColor: backgroundOpacityColor,
				borderTopColor: backgroundColor,
				borderWidth: 10,
				marginLeft: -10,
				top: '97%'
			}
		},
		page: {
			textAlign: 'center',
			fontSize: '2em',
			cursor: 'pointer',
			width: '100%',

			'&:first-child': {
				borderRight: border,
			},
			'&:last-child': {
				borderLeft: border,
			}
		},
		disabledPage: {
			extend: 'page',
			cursor: 'none'
		}
	}
}
