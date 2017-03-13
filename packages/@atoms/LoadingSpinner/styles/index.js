const SPIN_LINE_WIDTH = 8
const SPIN_LINE_COLOR = '#ff7e00'

export default {

	container: {
		position: 'relative',
		width: '100%',
		height: '100%'
	},

	spinner: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,

		animationDuration: '0.75s',
		animationIterationCount: 'infinite',
		animationName: 'rotate-forever',
		animationTimingFunction: 'linear',
		border: {
			width: SPIN_LINE_WIDTH,
			style: 'solid',
			color: SPIN_LINE_COLOR
		},
		borderRightColor: 'transparent',
		borderRadius: '50%',
		display: 'inline-block'
	},
	clickaviaSpinner: {
		extend: 'spinner',
		borderWidth: 4,
		borderColor: '#7cda46'
	},

	'@keyframes rotate-forever': {
		'0%': {
			transform: 'rotate(0deg)'
		},
		'100%': {
			transform: 'rotate(360deg)'
		}
	}

}
