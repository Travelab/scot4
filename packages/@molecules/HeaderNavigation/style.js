export default {
	container: {
		width: '100%',
		'& > a': {
			fontSize: 20,
			color: '#d5d6d7',
			marginLeft: 10,
			marginRight: 10,
			textDecoration: 'none'
		}
	},

	mobileContainer: {
		display: 'flex',
		flexFlow: 'column nowrap',
		'& > a': {
			fontSize: 16,
			lineHeight: 1.4,
			color: '#d5d6d7',
			textDecoration: 'none'
		}
	}
}

