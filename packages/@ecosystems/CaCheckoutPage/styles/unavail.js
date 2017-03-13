export default {
	container: {
		background: 'white'
	},

	contentUnavail: {
		fontSize: 20,
		fontWeight: 300,
		textAlign: 'center',
		color: '#777'
	},

	newSearchBtnWrapper: {
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'uppercase'
	},

	buyBtnWrapper: {
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'uppercase',
	},

	btns: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	t959Btns: {
		extend: 'btns',
		flexFlow: 'column nowrap',
		'& > div': {
			paddingBottom: 10
		}
	},
}
