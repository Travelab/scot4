export default {
	container: {
		width: '100%',
		outline: 'none'
	},

	loaderWrapper: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		background: '#fff',
	},

	loader: {
		padding: [10, 0],
		width: 50,
		height: 50,
	},

	// TODO: hotfix for searchbar. Need to full refactor for SearchBar
	inputWrapper: {
		width: '100%',
		padding: [ 19.5, 16 ],
		boxSizing: 'border-box',
		background: 'white',
		borderRight: {
			width: 1,
			style: 'solid',
			color: '#ccc'
		},
		color: '#444',
		fontSize: 18
	},
}
