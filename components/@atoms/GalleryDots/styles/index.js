export default {

	container: {
		display: 'flex',
		position: 'absolute',
		zIndex: 20,
		padding: 10
	},

	dot: {
		width: 10,
		height: 10,
		borderRadius: 6,
		backgroundColor: 'rgba(255, 255, 255, 0.6)',
		margin: 3
	},

	activeDot: {
		extend: 'dot',
		backgroundColor: 'white',
		boxShadow: {
			x: 0,
			y: 0,
			blur: 4,
			spread: 2,
			color: 'rgba(0, 0, 0, 0.2)'
		}
	}

}
