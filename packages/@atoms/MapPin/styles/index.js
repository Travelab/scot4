export default function ({ width = 16, height = 16 } = {}) {

	const activeResizer = 1.5
	const activeWidth = width * activeResizer
	const activeHeight = height * activeResizer

	return {
		pin: {
			cursor: 'pointer',
			width,
			height,
			position: 'relative',
			left: -width / 2,
			top: -height,
			'& svg': {
				filter: 'drop-shadow(1px 1px 2px #888)',
				'& path': {
					fill: '#FFF'
				}
			}
		},

		activePin: {
			extend: 'pin',
			width: activeWidth,
			height: activeHeight,
			position: 'relative',
			left: -activeWidth / 2,
			top: -activeHeight,
			zIndex: 2,
			'& svg': {
				'& path': {
					fill: '#31A9B3'
				}
			}
		}
	}
}
