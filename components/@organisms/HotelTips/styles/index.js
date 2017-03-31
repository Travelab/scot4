import theme from 'themes/default.js'


export default ({ height = 48, width = 470 } = {}) => {
	const padding = 10
	const paddingBottom = 5

	return {
		tipsPanel: {
			height: height - paddingBottom,
			width: width - padding * 2,
			padding: [ 0, padding, paddingBottom, padding ],
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
			borderTop: {
				width: 1,
				style: 'solid',
				color: theme.colors.borderGray
			}
		}
	}
}
