export default {
	unavailContainer: {
		background: 'white'
	},

	unavailBtns: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	t959UnavailBtns: {
		extend: 'unavailBtns',
		flexFlow: 'column nowrap',
		'& > div': {
			paddingBottom: 10
		}
	},

	unavailNewSearchBtnWrapper: {
		fontSize: 14,
		fontWeight: 500,
		textTransform: 'uppercase'
	},

	unavailContentContainer: {
		fontSize: 20,
		fontWeight: 300,
		textAlign: 'center',
		color: '#777'
	}
}
