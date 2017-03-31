export default {
	mobileContainer: {
		'&:hover $footer': {
			backgroundColor: '#dbe5e8',
		},
		backgroundColor: '#ffffff',
		borderRadius: 2,
	},
	container: {
		extend: 'mobileContainer',
		transition: 'box-shadow ease .2s',
		boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12)',
		'&:hover': {
			boxShadow: '0 16px 16px 0 rgba(0, 0, 0, 0.1), 0 0 16px 0 rgba(0, 0, 0, 0.22)'
		}
	},
	airlines: {
		margin: 0,
		padding: '5px 0',
		listStyle: 'none',
		display: 'flex',
		'& > li': {
			marginRight: 10,
			'& > img ': {
				display: 'block'
			}
		}
	},
	header: {
		display: 'flex',
		borderRadius: '2px 2px 0 0',
		padding: '8px 8px 7px 14px',
		justifyContent: 'space-between',
		backgroundColor: '#FBFBFB',
		borderBottom: '1px solid #e2e6e8',
	},
	footer: {
		transition: 'background-color ease .2s',
		backgroundColor: '#F3F5F5',
		padding: 16,
		borderTop: '1px solid #e2e6e8',
		textAlign: 'center',	
		fontSize: 20,
		fontWeight: 500,
		color: '#333333',
		borderRadius: '0 0 2px 2px',
	},
}
