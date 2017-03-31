

export default {
	tooltip: {
		position: 'absolute',
		color: '#fff',
		fontSize: 12,
		backgroundColor: '#333',
		borderRadius: 3,
		filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.24)) drop-shadow(0 0 2px rgba(0, 0, 0, 0.12))',
		'&:after': {
			border: 'solid transparent',
			content: "' '",
			height: 0,
			width: 0,
			position: 'absolute',
			pointerEvents: 'none',
			borderColor: 'rgba(51, 51, 51, 0)',
			borderWidth: 8,			
		},
		'& > div': {
			padding: 12,
			maxWidth: '30vw',
		},
		'&.fade-leave': {
			opacity: .98
		},
		'&.fade-leave.fade-leave-active': {
			transition: 'ease 180ms',
			opacity: 0.001
		},
		'&.fade-enter': {
			opacity: 0.001
		},
		'&.fade-enter.fade-enter-active': {
			transition: 'ease 250ms',
			opacity: .98
		},
	},
	top: {
		extend: 'tooltip',
		transform: 'translateX(-50%) translateY(-100%)',
		marginTop: -16,
		'&:after': {
			top: '100%',
			left: '50%',
			borderTopColor: '#333',
			marginLeft: -8,
		}
	},
	bottom: {
		extend: 'tooltip',
		transform: 'translateX(-50%) translateY(0%)',
		marginTop: 16,
		'&:after': {
			bottom: '100%',
			left: '50%',
			borderBottomColor: '#333',
			marginLeft: -8,
		}
	},
	right: {
		extend: 'tooltip',
		transform: 'translateX(0%) translateY(-50%)',
		marginLeft: 16,
		'&:after': {
			right: '100%',
			top: '50%',
			borderRightColor: '#333',
			marginTop: -8,
		}
	},
	left: {
		extend: 'tooltip',
		transform: 'translateX(-100%) translateY(-50%)',
		marginLeft: -16,
		'&:after': {
			left: '100%',
			top: '50%',
			borderLeftColor: '#333',
			marginTop: -8,
		}
	},
}
