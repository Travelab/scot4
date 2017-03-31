import theme from 'themes/default.js'
import arrowLeft from '../images/arrow_left.svg'
import arrowRight from '../images/arrow_right.svg'

export default () => {

	const btn = {
		height: 30,
		width: 30,
		cursor: 'pointer',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	}

	const arrowImg = {
		marginTop: 3,
		marginLeft: 3
	}

	const borderRadius = {
		borderBottomLeftRadius: theme.serpRadius,
		borderTopLeftRadius: theme.serpRadius,
	}
	const carouselItem = {
		position: 'absolute',
		backgroundSize: 'cover',
		top: 0,
		bottom: 0,
		width: '100%',
	}

	return {
		carousel: {
			width: '100%',
			position: 'relative',
			overflow: 'hidden',

			'& img': {
				extend: borderRadius,
			}
		},

		overlayCarousel: {
			width: '100%',
			height: '100%',
			position: 'relative'
		},

		carouselItemRounded: {
			extend: [ carouselItem, borderRadius ],
		},

		carouselItemActive: {
			extend: carouselItem,
			zIndex: 3
		},

		carouselItemNext: {
			extend: carouselItem,
			zIndex: 1
		},

		carouselItemPrev: {
			extend: carouselItem,
			zIndex: 2
		},

		carouselItemActiveRounded: {
			extend: 'carouselItemRounded',
			zIndex: 3
		},

		carouselItemNext: {
			extend: carouselItem,
			zIndex: 1
		},

		carouselItemPrev: {
			extend: carouselItem,
			zIndex: 2
		},

		prevBtn: {
			extend: btn,

			'&:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.8)'
			}
		},
		prevBtnImg: {
			extend: arrowImg,
			height: 24,
			width: 24,
			backgroundImage: `url("${arrowLeft}")`,
		},
		nextBtn: {
			extend: btn,

			'&:hover': {
				backgroundColor: 'rgba(0, 0, 0, 0.8)'
			}
		},
		nextBtnImg: {
			extend: arrowImg,
			height: 24,
			width: 24,
			backgroundImage: `url("${arrowRight}")`,
		},
		carouselControls: {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			zIndex: 5,
			background: 'rgba(255,255,255,0)',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',

			'& div': {
				visibility: 'hidden',
			},
			'&:hover div': {
				visibility: 'visible',
			}
		},
	}
}
