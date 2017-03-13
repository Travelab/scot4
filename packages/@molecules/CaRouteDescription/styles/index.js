import theme from 'themes/clickavia.js'


export default {

	container: {
		color: theme.colors.headerText
	},

	top: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
	},

	t414Top: {
		extend: 'top',
		justifyContent: 'center'
	},

	left: {
		'& div:first-child': {
			marginBottom: 10
		}
	},

	right: {
		display: 'flex',
	},

	why: {
		width: 275
	},
	satisfaction: {
		width: 275
	},

	title: {
		fontSize: 22
	},

	content: {
		fontSize: 14,
		opacity: 0.9,
		marginTop: 2
	},

	bottom: {
		marginTop: 60,
		textAlign: 'center'
	},

	t414Bottom: {
		extend: 'bottom',
		marginTop: 20
	},

	route: {
		fontSize: 32
	},

	t414Route: {
		extend: 'route',
		fontSize: 30
	},

	details: {
		fontSize: 20,
		fontWeight: 300,
		opacity: 0.8
	},

	t414Details: {
		extend: 'details',
		fontSize: 17
	},

}
