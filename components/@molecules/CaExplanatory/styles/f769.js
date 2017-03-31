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

	tech: {
		width: 400,
		fontSize: 16
	},
	techHint: {
		fontWeight: 600
	},

	mainIdea: {
		width: '100%',
		marginTop: 40,
		textAlign: 'center',
		fontWeight: 600
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
}
