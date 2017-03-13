import { compose, injectStyle } from '@utils/decoract'
import Isvg from 'react-inlinesvg'

import style from './styles'
import pinImg from './images/pin.svg'

const enhancer = compose(
	injectStyle(style())
)

const MapPin = ({ $, ...props }) => {

	const { isActive, onClick } = props

	return (
		<div className={isActive ? $.activePin : $.pin} onClick={() => onClick()}>
			<Isvg src={pinImg}/>
		</div>
	)
}

export default enhancer(MapPin)
