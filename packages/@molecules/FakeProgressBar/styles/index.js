export default {

	container: {
		position: 'relative',
		width: '100%',
		height: '100%'
	},

	/*progressBar: {
		position: 'absolute',
		'& > .react-progress-bar-percent': {
			background: '#ff9233',
			boxShadow: 'none',
			height: '5px'
		}
	}*/

	barWrapper: {
		position: 'absolute',
		left: 0,
		top: 0,
		right: 0,
		bottom: 0,
		transition: 'all 400ms'
	},

	bar: {
		height: '5px',
		background: '#ff9233',
		transition: 'all 200ms ease'
	}

}
