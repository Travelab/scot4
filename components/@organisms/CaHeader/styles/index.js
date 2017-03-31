import { grid } from '@utils/taffy'

export default {
	headerWrapper: {
		width: '100%',
		background: '#fff',
		display: 'flex',
		justifyContent: 'center'
	},
	container: {
		height: 55,
		display: 'flex',
		maxWidth: 1170,
		width: '100%',
		justifyContent: 'space-between',
		fontSize: 12,
		'& p': {
			margin: 0
		}
	},
	smallContainer: {
		extend: 'container',
		height: 'auto',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	sideContainer: {
		width: '50%',
		display: 'flex',
		marginTop: 10
	},
	smallSideContainer: {
		extend: 'sideContainer',
		width: '100%'
	},
	leftContainer: {
		extend: 'sideContainer'
	},
	smallLeftContainer: {
		extend: 'smallSideContainer',
		flexWrap: 'wrap',
		justifyContent: 'center'
	},
	rightContainer: {
		extend: 'sideContainer',
		justifyContent: 'flex-end',
		marginRight: '5%'
	},
	smallRightContainer: {
		extend: 'smallSideContainer',
		justifyContent: 'center'
	},
	logoContainer: {
		margin: '0 5%'
	},
	menuContainer: {
		display: 'flex',
		textTransform: 'uppercase'
	},
	menuItem: {
		padding: 10

	}

}