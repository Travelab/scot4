import theme from 'themes/default.js'


export default function ({ fontSize = 16, height = 80 } = {}) {
	const part = {
		fontSize,
		padding: 20,
		color: 'white',
		width: '50%'
	}

	return {
		container: {
			height,
			width: '100%',
			display: 'flex',
			borderRadius: theme.serpRadius,
			backgroundColor: theme.colors.activeOffer
		},
		leftPart: {
			extend: part,
			borderRight: {
				style: 'solid',
				width: 1,
				color: 'white'
			}
		},
		rightPart: {
			extend: part
		},
		controls: {
			height: 0
		},
		closeBtn: {
			position: 'relative',
			top: -12,
			left: 728,
			cursor: 'pointer'
		},

		hint: {
		},
		marginedHint: {
			extend: 'hint',
			margin: 10
		},
		mobileContainer: {
			borderRadius: theme.serpRadius,
		},
		mobileContent: {
			backgroundColor: 'white',
			padding: 10
		},
		mobileControl: {
			backgroundColor: theme.colors.orange,
			textTransform: 'uppercase',
			color: 'white',
			textAlign: 'center',
			padding: 10,
			borderRadius: [ 0, 0, theme.serpRadius, theme.serpRadius ],
			cursor: 'pointer'
		},
		mobileHeader: {
			backgroundColor: '#f2f2f2',
			borderRadius: [ theme.serpRadius, theme.serpRadius, 0, 0 ],
			padding: 10,
			display: 'flex',
			justifyContent: 'center'
		},
		plus: {
			fontSize: 36,
			fontWeight: 700,
			color: '#787878',
			padding: [ 0, 10 ]
		}
	}
}
