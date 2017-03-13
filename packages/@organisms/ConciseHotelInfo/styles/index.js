import theme from 'themes/default.js'


export default ({ height = 127 } = {}) => {

	const paddingLeft = 10
	const paddingTop = 5

	return {
		container: {
			height: height - paddingTop * 2,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
			padding: [ paddingTop, 0, paddingTop, paddingLeft ],
			borderRight: {
				width: 1,
				style: 'solid',
				color: theme.colors.borderGray
			}
		},
		mobileContainer: {
			width: '100%',
			display: 'flex',
			alignItems: 'flex-end',
			padding: 10
		},
		spacer: {
			width: 15
		},
		data: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
		},
		row: {
			width: '100%',
			display: 'flex',
			alignItems: 'flex-end',
			justifyContent: 'space-between',
		}
	}
}
