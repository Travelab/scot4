import { sg, tm } from '@utils/taffy'

export default {
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
}
