const BACKSIDE_TOP_OFFSET = 20
const BACKSIDE_CONTENT_WIDTH = 150
const BACKSIDE_LEFT_OFFSET = BACKSIDE_CONTENT_WIDTH + 20

export default {

	container: {
		width: '100%',
		display: 'flex',
		alignItems: 'stretch',
		position: 'relative',
		height: '100%',
	},

	t414Container: {
		extend: 'container',
		flexFlow: 'column nowrap',
		background: '#a6a6a6',
		padding: 5,
		boxSizing: 'border-box'
	},

	frontSide: {
		boxSizing: 'border-box',
		zIndex: 10,
		width: `calc(100% - ${BACKSIDE_LEFT_OFFSET}px)`,
		height: `calc(100% - ${BACKSIDE_TOP_OFFSET}px)`,
		display: 'flex',
		flexFlow: 'column nowrap',
		borderRadius: 20,
		padding: 10,
		background: 'radial-gradient(#a6a6a6, #626262)'
	},

	backSide: {
		boxSizing: 'border-box',
		width: `calc(100% - ${BACKSIDE_LEFT_OFFSET}px)`,
		top: 20,
		bottom: 0,
		right: 0,
		position: 'absolute',
		borderRadius: 20,
		padding: 10,
		background: 'radial-gradient(#c6c6c6, #d9d9d9)',
		display: 'flex',
		flexFlow: 'column nowrap',

		'&:before': {
			display: 'block',
			content: '""',
			margin: [10, 0],
			paddingRight: 10,
			height: 50,
			width: '100%',
			background: '#6c6c6c'
		},

		'&:after': {
			content: '"обратная сторона"',
			position: 'absolute',
			top: -15,
			right: 20,
			fontSize: 12,
			color: '#9a9e9e'
		}
	},

	backSideContent: {
		width: 150,
		alignSelf: 'flex-end'
	},

	row: {
		width: '100%',
		padding: [10, 0],
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between'
	},

	t414Row: {
		extend: 'row',
		boxSizing: 'border-box',
		padding: [5, 0]
	},

	visaLogoWrapper: {
		width: 64,
		height: '100%',
		background: 'linear-gradient(to bottom, #fff, #eee)',
		marginRight: 10,
		borderRadius: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& > img': {
			height: '36%'
		}
	},
	t414VisaLogoWrapper: {
		extend: 'visaLogoWrapper',
		marginRight: 5,
		width: 55,
		flexShrink: 0,
	},

	logos: {
		width: '100%',
		height: 41,
		display: 'flex'
	},
	t414Logos: {
		extend: 'logos',
		width: 'initial',
		paddingLeft: 10,
		height: 39,
		alignSelf: 'flex-end',
		flex: '1 0 120px',
	},

	mastercardLogoWrapper: {
		width: 64,
		height: '100%',
		boxSizing: 'border-box',
		background: 'linear-gradient(to bottom, #005989, #1c2d67)',
		border: {
			width: 1,
			style: 'solid',
			color: '#1c2d67'
		},
		borderRadius: 5,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		'& > img': {
			height: '80%'
		}
	},
	t414MastercardLogoWrapper: {
		extend: 'mastercardLogoWrapper',
		width: 60,
		flexShrink: 0,
	},

	wrapper: {
		width: '100%',
		color: '#444',
		// flexGrow: 1
	},

	cardNumberWrapper: {
		extend: 'wrapper',
		fontSize: 24
	},
	t414CardNumberWrapper: {
		extend: 'cardNumberWrapper',
		fontSize: 16
	},

	holderWrapper: {
		extend: 'wrapper',
		fontSize: 18,
		width: 236
	},
	t414HolderWrapper: {
		extend: 'wrapper',
		fontSize: 16
	},

	expDateWrapper: {
		extend: 'wrapper',
		fontSize: 18,
		width: 101
	},
	t414ExpDateWrapper: {
		extend: 'wrapper',
		fontSize: 16
	},

	cvvWrapper: {
		extend: 'wrapper',
		fontSize: 24
	},
	t414CvvWrapper: {
		extend: 'cvvWrapper',
		fontSize: 16,
		paddingLeft: 10
	},

}
