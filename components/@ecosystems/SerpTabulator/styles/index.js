export default {

	tabulator: {
		width: '100%', 
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		margin: '0 auto',
	},
	tabList: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: 0,
		margin: 0,
		backgroundColor: '#f2f2f2',
		minWidth: 400,
		
	},
	tabItem: {
		border: {
			width: 5,
			style: 'solid',
			color: 'lightgray'
		},
		height: 50,
		width: 100,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tabContent: {
		marginTop: 40,
	},
	activeTab: {
		border: {
			width: 5,
			style: 'solid',
			color: 'black'
		},
	},
	topSticky: {
		zIndex: 15,
		overflowX: 'auto',
	}
}