import theme from 'themes/clickavia'
import leftArrowImg from '../images/leftArrow.svg'

export default () => {
	const container = {
		textAlign: 'center',
		display: 'block',
	}

	const clickedBoxShadow = {
		inset: 'inset',
		x: 1,
		y: 1,
		blur: 3,
		spread: 0,
		color: 'rgba(0, 0, 0, 0.35)'
	}

	const whiteBoxShadow = {
		inset: 'inset',
		x: 0,
		y: 1,
		blur: 0,
		spread: 0,
		color: '#ffffff'
	}

	return {
		container: {
			extend: container
		},

		enabled: {
			cursor: 'pointer'
		},

		disabled: {
			cursor: 'not-allowed'
		},

		orange: {
			extend: container,
			boxShadow: whiteBoxShadow,
			background: theme.colors.orangeGradient,

			'&:active': {
				background: theme.colors.orange,
				boxShadow: clickedBoxShadow,
			}
		},

		orangeDisabled: {
			extend: container,
			boxShadow: whiteBoxShadow,
			background: theme.colors.grayGradient,
		},

		gray: {
			extend: container,

			background: theme.colors.grayGradient,
			border: {
				color: '#B9B9B9',
				style: 'solid',
				width: 1
			},

			'&:active': {
				background: theme.colors.gray,
				boxShadow: clickedBoxShadow,
			},
		},
		
		green: {
			extend: container,

			background: 'linear-gradient(to bottom, #7ddb47, #44ac09)',

			'&:hover': {
				background: '#4eda4b'
			},
			'&:active': {
				background: 'linear-gradient(to bottom, #4cae4b, #148d2e)',
				// boxShadow: clickedBoxShadow,
			},
		},

		lightGreen: {
			extend: container,
			background: '#ddfed8',
			color: '#007f14',

			'&:hover': {
				background: '#9ff5a1'
			},
			'&:active': {
				color: 'white',
				background: '#357410'
			}
		},

		white: {
			extend: container,
			background: 'white',
			color: '#357410',

			'&:hover': {
				background: '#bdeca2'
			},
			'&:active': {
				color: 'white',
				background: '#357410'
			}
		},

		darkLineBottom: {
			borderBottom: {
				width: 4,
				style: 'solid',
				color: '#347410'
			}
		},

		rounded: {
			borderRadius: theme.borderRadius,
		},
		leftArrow: {
			backgroundImage: `url("${leftArrowImg}")`,
			width: 172,
			height: 40,
			'& > div': {
				padding: [ 9, 0 ]
			}
		},

		title: {},
		underline: {
			textDecoration: 'underline'
		},

		hint: {
			fontWeight: 'bold'
		}
	}
}
