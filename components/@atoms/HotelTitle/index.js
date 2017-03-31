import { compose, injectStyle } from '@utils/decoract'

import style from './styles'

const enhancer = compose(
	injectStyle(style())
)

const HotelTitle = ({ $, ...props }) => {

	const { title } = props

	return (
		<div className={$.title}>
			{title}
		</div>
	)
}

export default enhancer(HotelTitle)
