import theme from 'themes/clickavia.js'


export default {

	container: {
		width: '100%',
		backgroundColor: theme.colors.gray,
		color: theme.colors.explanatoryText,
		fontSize: 20,
	},

	wrap: {
		padding: [ 17, 35 ],
	},

	t414Wrap: {
		extend: 'wrap',
		padding: [ 17, 20 ]
	},

	tech: {
		width: 400,
		fontSize: 16
	},
	techHint: {
		fontWeight: 600
	},

	t414Tech: {
		extend: 'tech',
		width: '100%',
		textAlign: 'center'
	},

	mainIdea: {
		width: '100%',
		marginTop: 40,
		textAlign: 'center',
		fontWeight: 600
	},

	t414MainIdea: {
		extend: 'mainIdea',
		marginTop: 20,
		fontWeight: 'initial',
		fontSize: 16
	},

	info: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 40,
	},
	price: {
		width: 225
	},
	priceHint: {
		fontSize: 12,
		lineHeight: 1.5,
		color: theme.colors.darkGray
	},

	orderNotReadyMsg: {
		extend: 'price',
		textAlign: 'center',
		display: 'flex',
		flexFlow: 'column nowrap'
	},

	loaderWrapper: {
		alignSelf: 'center',
		width: 50,
		height: 50
	},

	t414Info: {
		extend: 'info',
		justifyContent: 'center',
		marginTop: 20,
	},
	t414Price: {
		extend: 'price',
		textAlign: 'center',
		width: '100%'
	},

	motivation: {
		width: 380,
		display: 'flex'
	},
	motivationIco: {
		marginRight: 12
	},

	charterInfo: {
		width: 210
	},

	charterGist: {
		fontSize: 12,
		lineHeight: 1.5,
		color: theme.colors.darkGray,
		textDecoration: 'underline',
		cursor: 'pointer'
	},

	tooltip: {
		maxWidth: 300,
		fontSize: 16
	}

}
