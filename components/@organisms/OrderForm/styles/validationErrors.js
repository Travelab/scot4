export default {

	container: {
		background: 'white',
		marginTop: 30,
		maxWidth: 620,
		width: '100%',
		borderRadius: 2,
		boxShadow: [
			{
				x: 0,
				y: 8,
				blur: 8,
				spread: 0,
				color: 'rgba(0,0,0,0.24)'
			},
			{
				x: 0,
				y: 0,
				blur: 8,
				spread: 0,
				color: 'rgba(0,0,0,0.12)'
			}
		]
	},
	title: {
		background: '#d0011b',
		fontSize: 16,
		padding: [ 14, 49 ],
		color: 'white',
		textAlign: 'center',
		position: 'relative',
		'&:before': {
			content: '""',
			position: 'absolute',
			top: -22,
			left: '40%',
			border: {
				width: 22,
				style: 'solid',
				color: '#d0011b'
			},
			borderTopWidth: 0,
			borderLeftColor: 'transparent',
			borderRightColor: 'transparent',
		}
	},
	content: {
		fontSize: 16,
		color: '#777',
		padding: 24,
		'& > div': {
			lineHeight: 1.25,
		},
		'& > div:first-child': {
			paddingBottom: 8
		}
	},
	footer: {
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: 24
	},
	errorMsg: {
		paddingBottom: 5
	},
	goToBtnWrapper: {
		maxWidth: 252,
		width: '100%',
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'uppercase'
	},
}
