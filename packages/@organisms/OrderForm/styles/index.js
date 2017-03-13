import theme from 'themes/clickavia.js'


export default {

	container: {
		width: '100%',
		backgroundColor: theme.colors.backgroundControls,
		borderBottomLeftRadius: theme.borderRadius,
		borderBottomRightRadius: theme.borderRadius,
	},

	validationErrors: {
		marginTop: 30,
	},
	validationTitle: {
		background: '#d0011b',
		fontSize: 16,
		padding: [14, 49],
		color: 'white',
		textAlign: 'center'
	},
	validationContent: {
		background: 'white',
		fontSize: 16,
		color: '#777',
		padding: 24
	},
	errorMsg: {
		paddingBottom: 5
	},

	paymentSection: {
		width: '100%',
		display: 'flex',
	},
	t414PaymentSection: {
		extend: 'paymentSection',
		flexFlow: 'column nowrap'
	},

	passengersDataListWrapper: {
		width: '100%',
	},

	customerFormWrapper: {
		width: 580
	},
	t414CustomerFormWrapper: {
		width: '100%'
	},

	card: {
		paddingBottom: 30,
		width: '100%',
		height: 259
	},
	t414Card: {
		extend: 'card',
		height: 'initial'
	},

	payment: {
		width: 550,
		paddingRight: 30,
	},
	t414Payment: {
		width: '100%'
	},

	paymentWhen: {
		display: 'block',
		fontSize: 17
	},

	securityInfo: {
		width: 300
	},
	t414SecurityInfo: {
		width: '100%',
		padding: [0, 10],
		boxSizing: 'border-box'
	}

}
