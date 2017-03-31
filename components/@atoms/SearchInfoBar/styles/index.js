export default {

	container: {
		display: 'flex',
		flexFlow: 'column nowrap',
		cursor: 'pointer',
		height: '100%',
		padding: [8, 0, 8, 10],
		boxSizing: 'border-box',
		justifyContent: 'space-between'
	},

	firstLine: {
		fontSize: 14
	},

	secondLine: {
		color: '#a4a4a4',
		fontSize: 12
	},

	consist: {
		position: 'relative',
		paddingLeft: 17,
		'&:before': {
			content: '""',
			position: 'absolute',
			background: '#a4a4a4',
			top: 6,
			left: 7,
			height: 4,
			width: 4,
			borderRadius: '50%'
		}
	}

}
