export default function ({ width = 16, height = 16 } = {}) {

	return {
		star: {
			width,
			height,
			display: 'inline-block',
			'& svg': {
				'& path': {
					fill: '#d6bb00'
				}
			}
		},
		lightStar: {
			extend: 'star',
			'& svg': {
				'& path': {
					fill: '#FFF'
				}
			}
		}
	}
}
