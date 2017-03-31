import theme from 'themes/clickavia.js'

export default {

	container: {
		width: '100%',
		display: 'flex',
		fontSize: 14,

		'& a': {
			color: 'inherit'
		}
	},

	info: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginRight: 110
	},
	title: {
		color: 'inherit'
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
