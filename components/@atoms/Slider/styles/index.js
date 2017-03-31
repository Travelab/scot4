const BAR_HEIGHT = 2
const HANDLE_HEIGHT = 22
const HANDLE_WIDTH = 22
const HANDLE_TOP = -(HANDLE_HEIGHT - BAR_HEIGHT) / 2
const HANDLE_EDGE = -HANDLE_WIDTH / 2

const BAR_BG_COLOR = '#888'
const FILL_BAR_BG_COLOR = '#fd9626'
const HANDLE_BG_COLOR = FILL_BAR_BG_COLOR

export default {

	container: {
		display: 'flex',
		flexFlow: 'row wrap',
		justifyContent: 'center',
		// background: 'white',
		padding: [10, 10 + (-HANDLE_TOP)],
		paddingBottom: 10 + (-HANDLE_TOP)
	},

	txtValues: {
		paddingBottom: (-HANDLE_TOP) + 5
	},

	bar: {
		position: 'relative',
		width: '100%',
		height: BAR_HEIGHT,
		background: BAR_BG_COLOR
	},

	handle: {
		position: 'absolute',
		height: HANDLE_HEIGHT,
		width: HANDLE_WIDTH,
		top: HANDLE_TOP,
		background: HANDLE_BG_COLOR,
		opacity: 0.5,
		borderRadius: HANDLE_WIDTH
	},

	fromHandle: {
		extend: 'handle',
		left: HANDLE_EDGE
	},

	toHandle: {
		extend: 'handle',
		right: HANDLE_EDGE
	},

	fillBar: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		background: FILL_BAR_BG_COLOR
	}

}
