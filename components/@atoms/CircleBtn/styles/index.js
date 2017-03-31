export default {

	container: {
		display: 'flex',
		flexFlow: 'row wrap',
		cursor: 'pointer',
		width: '100%',
		height: '100%',
		borderRadius: '50%',
		justifyContent: 'space-around',
		alignItems: 'center',

		'& > img': {
			width: '50%',
		},
		'& > span': {
			textAlign: 'center',
			marginTop: '-30%',
		}
	}

}
