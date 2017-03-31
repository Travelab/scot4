export default function ({ height = 50 }) {

	return {
		container: {
			background: '#ff7e00',
			// need normalizer
			border: 'none',
			fontSize: 0,
			outline: 'none',
			cursor: 'pointer',
			width: '100%',
			height: '100%',

			'&:hover': {
				background: '#ff9933'
			},
			'&:active': {
				background: '#cc6600'
			},

			'& img': {
				height: height / 2
			}
		}
	}
}

