import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import style from './styles'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style()),
)

const HotelDistance = ({ l, $, ...props }) => {

	const { distance } = props

	if (!distance) return null

	const txtUnit = l('км')
	const txtDescription = l('от центра')
	const normalizedDistance = Math.round(distance * 10) / 10

	return (
		<div>
			<div className={$.content}>
				{normalizedDistance} {txtUnit}
			</div>
			<div className={$.description}>{txtDescription}</div>
		</div>
	)
}

export default enhancer(HotelDistance)
