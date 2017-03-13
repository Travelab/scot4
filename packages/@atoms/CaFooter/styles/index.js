import theme from 'themes/clickavia.js'

export default {

	container: {
		width: '100%',
		display: 'flex',
		fontSize: 14,

		'& a': {
			color: theme.colors.importantText,
		}
	},

	info: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginRight: 110
	},
	title: {
		color: theme.colors.darkGray,
	},

	links: {
		'& > div': {
			marginBottom: 10
		},

		'& > div:last-child': {
			marginBottom: 0
		},
	}

}
