const spinAnimationName = 'ROOOOL'

export default {

	cmp: {
		position: 'relative',
		width: 300,
		height: 600,
		background: '#f0f0f0',
		padding: 10,
	},

	shield: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		background: 'rgba(0,0,0,.9)',
		color: '#fff',
		fontSize: 24,
		transition: {
			property: 'top',
			duration: 120,
			timingFunction: 'ease'
		},
	},

	shieldRaised: {
		extend: 'shield'
	},

	shieldDown: {
		extend: 'shield',
		top: 600 - 30
	},

	toggleShieldBtn: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		cursor: 'pointer',
		'&:hover': {
			color: '#c1e255'
		}
	},

	pinControl: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#dcf48e',
		height: 60,
		padding: 20,
		marginBottom: 40,
	},

	pin: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		fontSize: 'large',
		animation: {
			name: spinAnimationName,
			duration: '20s',
			iterationCount: 'infinite',
			timingFunction: 'linear'
		}
	},

	[`@keyframes ${spinAnimationName}`]: {
		from: {
			transform: 'rotate(0deg)'
		},
		to: {
			transform: 'rotate(360deg)'
		}
	}

}