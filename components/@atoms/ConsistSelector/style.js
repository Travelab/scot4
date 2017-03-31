const selectorWidth = 280

export default {
	selector: {
		display: 'flex',
		flexFlow: 'row wrap',
		// backgroundColor: 'white',
		color: '#444',
		paddingTop: 10,
		paddingBottom: 5,
		minWidth: selectorWidth,
		width: '100%',
		justifyContent: 'space-around'
	},

	selectorItem: {
		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'space-between',
		// height: 150,
		width: (selectorWidth - 10) / 3
	},

	selectorItemTitle: {
		display: 'flex',
		flexFlow: 'column nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: 14,
		marginBottom: 10
	},

	selectorItemTitleAge: {
		color: '#888',
		fontSize: 12
	},

	selectorValue: {
		padding: [10, 0],
		textAlign: 'center',
		cursor: 'pointer',

		'&:hover': {
			background: '#ccc'
		}
	},

	selectedValue: {
		extend: 'selectorValue',
		background: '#ff7e00',
		color: 'white'
	}
}

