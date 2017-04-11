import Isvg from 'react-inlinesvg'
import { compose, injectStyle } from '@utils/decoract'
import { range } from 'lodash'

import style from './styles/index'
import starImg from './images/star.svg'

const enhancer = compose(
	injectStyle(style())
)

const HotelStars = ({ $, ...props }) => {

	const { stars, colorScheme } = props

	if (stars) {
		const starClass = colorScheme === 'light' ? $.lightStar : $.star

		const renderedStars = range(stars).map((idx) => (
			<Isvg key={idx} className={starClass} src={starImg}/>
		))

		return (
			<div>{renderedStars}</div>
		)
	} else {

		return null
	}

}

export default enhancer(HotelStars)
