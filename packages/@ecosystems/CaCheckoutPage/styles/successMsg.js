export default {
	container: {
		display: 'flex',
		flexFlow: 'column',
		paddingTop: 30,
		paddingBottom: 60
	},

	mainInfo: {
		display: 'flex',
		justifyContent: 'center'
	},

	btns: {
		display: 'flex',
		justifyContent: 'center',
		paddingTop: 48
	},
	t959Btns: {
		extend: 'btns',
		flexFlow: 'column',
		alignItems: 'center',
		'& > div': {
			marginRight: 0,
			paddingBottom: 10
		}
	},

	addToGoogleBtn: {
		fontSize: 20,
		width: 254,
		marginRight: 64
	},
	buyAnotherOneTicketBtn: {
		fontSize: 20,
		width: 214,
		marginRight: 64
	},
	lookAtHotelsBtn: {
		fontSize: 20,
		width: 238
	},

	checkIconWrapper: {
		'& > img': {
			width: 80,
			height: 80,
		}
	},

	orderInfo: {
		display: 'flex',
		flexFlow: 'column nowrap',
		padding: [ 8, 0, 0, 24 ],
		fontSize: 16,
		lineHeight: 1.13,
		color: 'white',
	},

	orderNum: {
		fontSize: 20,
		fontWeight: 500,
		lineHeight: 1,
		paddingBottom: 10
	},

	userAccountLink: {
		color: 'white',
		cursor: 'pointer'
	},

	additionalContent: {
		opacity: 0.8
	}
}
