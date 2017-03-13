import theme from 'themes/default.js'


export default () => {
	return {
		container: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%'
		},
		hint: {
			backgroundColor: 'rgba(0, 0, 0, 0.1)'
		},
		pagesWrap: {
			height: 134,
			width: '100%'
		}
	}
}
