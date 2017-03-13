export default {

	container: {
		width: '100%',
		position: 'relative',
		boxSizing: 'border-box',
	},

	childrenWrapper: {
		boxSizing: 'border-box',
		overflow: 'hidden'
	},

	errorMsg: {
		fontSize: 13,
		position: 'absolute',
		top: '94%',
		left: 0,
		right: 0,
		boxSizing: 'border-box',
		padding: 5,
		background: '#d0021b',
		color: 'white'
	},

	defaultChildrenWrapper: {
		extend: 'childrenWrapper',
		borderRadius: 5,
		border: {
			width: 2,
			style: 'solid',
			color: '#81d3ea'
		}
	},

	validChildrenWrapper: {
		extend: 'defaultChildrenWrapper',
		borderColor: '#7ad876'
	},

	invalidChildrenWrapper: {
		extend: 'defaultChildrenWrapper',
		borderColor: '#d0021b'
	}

}
