import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import style from './styles'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style()),
)

const RoomFareCondition = ({ l, $, ...props }) => {

	const { refundable } = props

	if (!refundable) return null

	const txtCondition = l('Бесплатная отмена')

	return (
		<div className={$.container}>
			{txtCondition}
		</div>
	)
}

export default enhancer(RoomFareCondition)
