export default {

	counterBtn: {
		width: '100%',
		height: '100%',
		background: 'linear-gradient(to bottom, #7cd946, #46ad0a)',
		fontWeight: 'bold',
		lineHeight: 1,
		color: 'white',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	activeBtn: {
		'&:active': {
			background: 'linear-gradient(to bottom, #51b54e, #07912f)',
		}
	},

	disabledBtn: {
		background: '#c2c2c2',
		'&:before': {
			background: '#d8d8d8 !important'
		},
		'&:after': {
			background: '#d8d8d8 !important'
		}
	},

	minusBtn: {
		'&:after': {
			content: '""',
			position: 'absolute',
			top: '44%',
			left: '25%',
			width: '50%',
			height: '12.5%',
			background: 'white',
			boxShadow: '1px 1px 0 0 rgba(0,0,0,0.15)'
		}
	},

	plusBtn: {
		'&:after': {
			content: '""',
			position: 'absolute',
			top: '44%',
			left: '25%',
			width: '50%',
			height: '12.5%',
			background: 'white',
		},
		'&:before': {
			content: '""',
			position: 'absolute',
			top: '25%',
			left: '44%',
			width: '12.5%',
			height: '50%',
			background: 'white',
		}
	}

}
