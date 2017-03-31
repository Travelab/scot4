import theme from 'themes/clickavia.js'

export default {
	container: {
		width: '100%',
		backgroundColor: theme.colors.gray,
		color: theme.colors.explanatoryText,
		fontSize: 20,
	},

	wrap: {
		padding: [ 17, 20 ],
	},

	row: {
		display: 'flex'
	},

	tech: {
		width: '100%',
		textAlign: 'left',
		paddingRight: 24,
		boxSizing: 'border-box',
		fontSize: 16
	},
	techHint: {
		fontWeight: 600
	},

	mainIdea: {
		width: '100%',
		textAlign: 'left',
		fontSize: 16
	},

	info: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginTop: 20,
	},

	price: {
		width: 225,
		textAlign: 'center',
		width: '100%'
	},
	priceHint: {
		fontSize: 12,
		lineHeight: 1.5,
		color: theme.colors.darkGray
	},
}
