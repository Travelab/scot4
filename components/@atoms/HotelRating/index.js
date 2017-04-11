import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import style from './styles/index'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style()),
)

const HotelRating = ({ l, $, ...props }) => {

	const { rating, square, colorScheme } = props

	if (square === true) {
		if (rating) {
			return (
				<div className={colorScheme === 'light' ? $.squareContainer : $.darkSquareContainer}>
					{rating}
				</div>
			)
		}
		else {
			return null
		}
	}
	else {
		if (rating) {
			const txtRatings = {
				6: l('Достаточно хорошо'),
				7: l('Хорошо'),
				8: l('Очень хорошо'),
				9: l('Превосходно')
			}

			const txtRating = txtRatings[Math.floor(rating)]

			const renderDescription = () =>
				<div className={$.description}>{txtRating}</div>

			return (
				<div>
					<div className={txtRating ? $.estimatedRatingSize : $.ratingSize}>
						{rating}
					</div>
					{txtRating && renderDescription()}
				</div>
			)
		}
		else {
			const txtNoRating = l('Нет рейтинга')

			return (
				<div>
					<div className={$.description}>{txtNoRating}</div>
				</div>
			)
		}
	}
}

export default enhancer(HotelRating)
