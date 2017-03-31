export default {
	row: {
		display: 'flex',
		flexFlow: 'row wrap',
		margin: -12,
	},
	column: {
		flex: [ 1, 0, '33%' ],
		padding: 12,
		maxWidth: '33%',
		boxSizing: 'border-box',
		minWidth: 310,
	},
	loadingWrapper: {
		margin: [ 0, 'auto' ],
		width: 64,
		height: 64,
		textAlign: 'center',
	},
	mobileContainer: {
		padding: 0,
		'& $column': {
			maxWidth: 'none'
		},
		'& $row': {
			display: 'block',
			padding: 0,
			margin: 0,
		},
	},
}
