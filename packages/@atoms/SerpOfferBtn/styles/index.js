import theme from 'themes/default.js'


export default ({ fontSize = 11, height = 38, width = 149 } = {}) => {

	const activeColor = 'white'
	const paddingTop = 5
	const paddingLeft = 5
	const borderWidth = 1

	return {
		btn: {
			fontSize,
			color: 'black',
			display: 'block',
			height: height - (paddingTop + borderWidth) * 2,
			width: width - (paddingLeft + borderWidth) * 2,
			border: {
				width: 1,
				style: 'solid',
			},
			textTransform: 'uppercase',
			padding: [ paddingTop, paddingLeft ],
			borderRadius: 5,
		},
		activeBtn: {
			extend: 'btn',
			cursor: 'pointer',
			color: activeColor,
			border: {
				color: activeColor,
			},
			background: 'linear-gradient(to top, #31A9B3, #47C2CC)'
		},
		moreBtn: {
			width: '100%',
			textTransform: 'uppercase',
			color: theme.colors.orange,
			textAlign: 'center',
			padding: [ 5, 0 ]
		}
	}
}
