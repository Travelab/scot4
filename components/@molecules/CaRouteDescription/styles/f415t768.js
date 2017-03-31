export default {
	container: {
		padding: [ 0, 16 ],
		textAlign: 'center',
		boxSizing: 'border-box'
	},

	top: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
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
		marginTop: 20,
		textAlign: 'center'
	},

	route: {
		fontSize: 32
	},

	details: {
		fontSize: 20,
		fontWeight: 300,
		opacity: 0.8
	}
}
