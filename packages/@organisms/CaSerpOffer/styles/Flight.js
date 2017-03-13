export default {
	route: {
		display: 'flex',
		alignItems: 'center',
		color: '#777',
		fontSize: 13,
		letterSpacing: 1,
		marginTop: 3
	},
	timeline: {
		display: 'block',
		flexGrow: 1,
		borderBottom: '1px solid #d8d8d8',
		position: 'relative',
		padding: 0,
		margin: '0 8px',
		'& li': {
			position: 'absolute',
			display: 'block',
			width: 5,
			top: -3,
			borderRadius: '50%',
			marginLeft: -3,
			height: 5,
			backgroundColor: '#e2e6e8',
			border: '1px solid #d8d8d8',
		}
	},
	timeTotal: {
		textAlign: 'right',
		flexGrow: 3,
		maxWidth: 105,
		color: '#777',
		fontSize: 20,
		paddingLeft: 10,
		paddingRight: 2,
		'& sup': {
			fontSize: '.65em',
			marginLeft: 1,
			top: '-.6em',
		},
		'& span': {
			marginLeft: 5,
		}
	},
	flightSwtches: {
		flexGrow: 6,
	},
	times: {
		justifyContent: 'space-between',
		display: 'flex',
	},
	flight: {
		display: 'flex',
		padding: '10px 8px 13px 8px',
		fontSize: 20,
		'&:first-child $times': {
			color: '#128f3f'
		},
		'&:last-child $times': {
			color: '#ff6d00'
		},
		'& + &': {
			borderTop: '1px dashed #e2e6e8',
		}
	}
}
