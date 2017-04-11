import { createEnhancer } from '@utils/decoract'
import ReactSwipe from 'react-swipe'
import Swipeable from 'react-swipeable'
import IIDetector from '@utils/ii-detector'

import duck from './ducks/index'
import style from './styles/index'

const enhancer = createEnhancer({
	duck,
	style: style(),
	withLang: false
})

import GalleryDots from '@atoms/GalleryDots'

class HotelGallery extends React.Component {
	constructor () {
		super()

		this.swipeRef = null
	}

	componentDidUpdate () {
		if (this.swipeRef) {
			this.swipeRef.swipe.setup()
		}
	}

	render () {
		const { $, state, actions, images, overlay } = this.props
		const { activeImageIdx } = state
		const { changeImage } = actions

		const canTouch = IIDetector.canTouch

		const count = images.length

		const prev = () => {
			this.swipeRef ? this.swipeRef.swipe.prev() : null
			const idx = activeImageIdx > 0 ? activeImageIdx - 1 : count - 1
			changeImage(idx)
		}
		const next = () => {
			this.swipeRef ? this.swipeRef.swipe.next() : null
			const idx = activeImageIdx < count - 1 ? activeImageIdx + 1 : 0
			changeImage(idx)
		}

		const renderedImages = images.map((image, idx) => {
			return <img key={idx} src={image}/>
		})

		const createRef = (component) => (this.swipeRef = component)

		const swipeOptions = {
			continuous: true
		}

		const gallery = (
			<div className={overlay ? $.overlayCarousel : $.carousel}>
				{canTouch && <GalleryDots count={count} position={activeImageIdx}/>}
				<ReactSwipe ref={createRef} swipeOptions={swipeOptions} key={images.length}>
					{renderedImages}
				</ReactSwipe>
				<div className={$.carouselControls}>
					<div onClick={prev} className={$.prevBtn}>
						<div className={$.prevBtnImg}/>
					</div>
					<div onClick={next} className={$.nextBtn}>
						<div className={$.nextBtnImg}/>
					</div>
				</div>
			</div>
		)

		if (canTouch) {
			return (
				<Swipeable onSwipedRight={prev} onSwipedLeft={next}>
					{gallery}
				</Swipeable>
			)
		}
		else {
			return gallery
		}
	}
}

export default enhancer(HotelGallery)
