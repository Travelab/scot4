import { sg, tm } from '@utils/taffy'

export default {

	container: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		background: '#ddd'
	},

	wrapper: {
		width: '100%',
		background: 'linear-gradient(to top, #eaeaea, #1ba5d2)'
	},

	t414Wrapper: {
		extend: 'wrapper',
		width: '100%',
		maxWidth: 414
	},

	header: {
		backgroundColor: 'white',
		padding: [ 10, 0 ],
		marginBottom: 27
	},

	t960Header: {
		extend: 'header',
		padding: 10
	},

	wrap: {
		maxWidth: 960,
		margin: [ 0, 'auto' ],
	},

	shadowedWrap: {
		marginTop: sg(6),
		borderRadius: tm('borderRadius', 5),
		overflow: 'hidden',
		boxShadow: {
			x: 0,
			y: 0,
			blur: 25,
			spread: null,
			color: 'rgba(0,0,0,.15)',
			inset: null,
		},
	},

	t960NotShadowedWrap: {
		marginTop: sg(6),
	},

	footer: {
		extend: 'wrap',
		padding: [ sg(6), 0 ],
	}

}
