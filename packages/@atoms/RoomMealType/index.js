import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import style from './styles'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style()),
)

const RoomMealType = ({ l, $, ...props }) => {

	const { mealType, colorScheme } = props

	const mealTypes = {
		RO: l('Без питания'),
		BB: l('Только завтрак'),
		HB: l('Завтрак и ужин'),
		FB: l('Завтрак, обед, и ужин'),
		AI: l('Все включено'),
		UAI: l('Ультра все включено')
	}
	const currentMealType = mealTypes[mealType]

	if (!currentMealType) return null

	const className = colorScheme === 'light' ? $.lightMealType : $.mealType

	return (
		<div className={className}>
			{currentMealType}
		</div>
	)
}

export default enhancer(RoomMealType)
