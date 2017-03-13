export default {

	container: {
		padding: 10,
		fontSize: '1em'
	},

	rowContainer: {
		display: 'flex',
		flexFlow: 'row wrap',
		paddingTop: 15,
		paddingBottom: 0,
		alignItems: 'center'
	},

	rowTitle: {
		paddingRight: 10,
		'&:after': {
			content: '"-"',
			paddingLeft: 10
		}
	},

	range: {
		color: '#8d8d8d'
	}

}
