import theme from 'themes/default.js'


export default ({ height = 127, width = 169 } = {}) => {

	const padding = [ 10, 10 ]

	return {
		container: {
			height: height - padding[1] * 2,
			width: width - padding[0] * 2,
			padding,
			backgroundColor: '#F0F1DF',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			borderTopRightRadius: theme.serpRadius
		},
		activeContainer: {
			extend: 'container',
			backgroundColor: theme.colors.activeOffer,
		},
	}
}
