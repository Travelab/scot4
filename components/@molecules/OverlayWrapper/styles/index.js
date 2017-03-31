const CLOSE_BTN_HEIGHT = 36
const CLOSE_BTN_WIDTH = CLOSE_BTN_HEIGHT
const CLOSE_BTN_OFFSET_XY = CLOSE_BTN_HEIGHT / 2.5
const CLOSE_BTN_FONT_SIZE = CLOSE_BTN_HEIGHT

export default {

	container: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 9999, // TODO: change to non magic number
		background: 'rgba(0,0,0,0.5)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	wrapper: {
		boxShadow: '0 15px 25px 0 rgba(0,0,0,0.21), 0 19px 38px 0 rgba(0,0,0,0.3)',
		maxHeight: '80%',
		width: 880,
		position: 'relative',
		display: 'flex',
		flexFlow: 'column nowrap'
	},
	f768t959Wrapper: {
		extend: 'wrapper',
		width: '95%',
		maxWidth: 720
	},
	t768Wrapper: {
		extend: 'wrapper',
		width: '95%',
		maxWidth: 280
	},
	childrenWrapper: {
		height: '100%',
		overflow: 'auto'
	},

	closeBtn: {
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: 'bold',
		fontSize: CLOSE_BTN_FONT_SIZE,
		top: -CLOSE_BTN_OFFSET_XY,
		right: -CLOSE_BTN_OFFSET_XY,
		width: CLOSE_BTN_WIDTH,
		height: CLOSE_BTN_HEIGHT,
		lineHeight: 1,
		borderRadius: '50%',
		background: '#4c4c4c',
		color: 'white',
		boxShadow: '0 4px 4px 0 rgba(0,0,0,0.2)',

		'&:active': {
			boxShadow: 'none'
		},
		'&:after': {
			content: '"\\00D7"'
		}
	}

}
