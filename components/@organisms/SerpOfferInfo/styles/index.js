export default ({ height = 175 } = {}) => {

	return {
		container: {
			height,
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
		},
		row: {
			display: 'flex'
		},
		chi: {
			width: 301
		},
		mobileContainer: {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-end',
			background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))'
		},
		mobileActiveZone: {
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'flex-end',

			pointerEvents: 'auto',
			cursor: 'pointer',
			color: 'white',
		}
	}
}
