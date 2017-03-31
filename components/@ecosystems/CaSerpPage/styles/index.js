
export default {

	container: {
		display: 'flex',
		flexFlow: 'row wrap',
		width: '100%',
		height: '100vh',
		justifyContent: 'center',
		background: '#E5E8E8'
	},
	loadingWrapper: {
		margin: [ 0, 'auto' ],
		width: 64,
		height: 64,
		textAlign: 'center',
	},
	wrapper: {
		maxWidth: 1000,
		boxSizing: 'border-box',
		width: '100%',
	},
	mobileSearchBarWrapper: {
		extend: 'searchBarWrapper',
		margin: [ 20, 10 ],
	},
	searchBarWrapper: {
		margin: [ 20, 0 ],
		borderRadius: 5,
		boxShadow: {
			x: 0,
			y: 4,
			blur: 20,
			spread: null,
			color: 'rgba(0,0,0,.3)',
		},
		backgroundColor: '#fff',
	},
}
