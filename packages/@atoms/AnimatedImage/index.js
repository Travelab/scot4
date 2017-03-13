import { Motion, spring } from 'react-motion'
import { compose, injectStyle } from '@utils/decoract'

import style from './styles'

const enhancer = compose(
	injectStyle(style),
)

const AnimatedImage = ({ $, ...props }) => {

	const {
		animationEndPoint,
		imageSrc,
		itemClass,
		endAnimationCb
	} = props

	const motionStyle = {
		left: spring(animationEndPoint, { stiffness: 87, damping: 16, precision: 10 })
	}

	const drawAnimation = (props) => {
		const { left } = props

		let imageStyle = {
			backgroundImage: `url(${imageSrc})`,
			left: left + 'px'
		}

		return <div style={imageStyle} className={itemClass}/>
	}

	return (
		<Motion style={motionStyle} onRest={endAnimationCb}>
			{drawAnimation}
		</Motion>
	)
}

export default enhancer(AnimatedImage)
