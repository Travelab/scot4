import theme from 'themes/clickavia.js'


export default {

	container: {
		width: '100%',
		backgroundColor: theme.colors.backgroundControls,
		borderBottomLeftRadius: theme.borderRadius,
		borderBottomRightRadius: theme.borderRadius,
	},

	validationWrapper: {
		display: 'flex',
		justifyContent: 'center'
	},

	paymentSection: {
		width: '100%',
		display: 'flex',
		flexFlow: 'column nowrap'
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
		flexShrink: 0,
		flexGrow: 0,
		width: 550,
		height: 259
	},
	t414Card: {
		extend: 'card',
		marginBottom: 20,
		width: '100%',
		height: 'initial'
	},

	payment: {
		width: '100%',
		display: 'flex',
		paddingBottom: 10,
	},
	t414Payment: {
		width: '100%'
	},

	paymentWhen: {
		display: 'block',
		fontSize: 17
	},

	securityInfo: {
		flex: '0 1 auto',
		paddingLeft: 33
	},
	t414SecurityInfo: {
		display: 'none',
		width: '100%',
		padding: [0, 10],
		boxSizing: 'border-box'
	}

}
