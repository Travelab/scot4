

const animName = 'glow'
const animStart = {
	boxShadow: [
		{
			x: 0,
			y: 0,
			blur: 25,
			spread: 5,
			color: '#1b9d28'
		},
		{
			x: 0,
			y: 0,
			blur: 25,
			spread: 0,
			color: 'rgba(0,255,255,.5)',
			inset: 'inset'
		}
	]
}

export default {

	cmp: {
		padding: 40,
		background: '#404040',
	},

	time: {
		extend: animStart,
		width: 50,
		padding: 10,
		margin: [0, 'auto', 30],
		background: '#000',
		fontSize: 28,
		color: '#4d8251',
		textAlign: 'center',
	},

	rest: {
		fontSize: 16,
		textAlign: 'center',
		color: '#4afbf6',
		fontFamily: 'Arial',
		marginBottom: 20,
	},

	timeRunning: {
		extend: 'time',
		color: '#84ec8b',
		animation: {
			name: animName,
			duration: 500,
			delay: 500,
			direction: 'alternate',
			iterationCount: 'infinite',
			timingFunction: 'ease-in-out'
		}
	},

	ctrlPanel: {
		textAlign: 'center',
		'& button': {
			margin: [0, 5],
			fontSize: 14,
		}
	},

	[`@keyframes ${animName}`]: {
		'0%': animStart,
		'60%': animStart,
		'100%': {
			boxShadow: [{
				x: 0,
				y: 0,
				blur: 40,
				spread: 10,
				color: '#1b9d28'
			},
			{
				x: 0,
				y: 0,
				blur: 5,
				spread: 0,
				color: 'rgba(0,255,255,.75)',
				inset: 'inset'
			}]
		}
	}

}