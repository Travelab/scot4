export default {
	container: {
		height: '100%',
		boxSizing: 'border-box',
		background: 'white',
		color: 'black',
		display: 'flex',
		flexFlow: 'column',
		alignItems: 'center',
		padding: 24,
		fontSize: 16
	},
	title: {
		fontSize: 20,
		fontWeight: 500,
	},
	content: {
		width: '100%',
		height: '100%',
		boxSizing: 'border-box',
		padding: [ 16, 0 ]
	},
	rulesWrapper: {
		width: '100%',
		height: '75%',
		fontSize: 14,
		overflow: 'auto',
	},
	t959RulesWrapper: {
		extend: 'rulesWrapper',
		height: '55%'
	},
	shortInfo: {
		display: 'flex',
		justifyContent: 'space-around',
		paddingTop: 24
	},
	t959ShortInfo: {
		flexFlow: 'column nowrap',
		fontSize: 14,
		'& > div': {
			paddingTop: 8
		}
	},
	footer: {
		display: 'flex',
		justifyContent: 'center'
	},
	closeBtn: {
	},
}
