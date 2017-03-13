import { compose, connectLangWithoutDuck, injectStyle } from '@utils/decoract'

import style from './styles'

const enhancer = compose(
	connectLangWithoutDuck(),
	injectStyle(style()),
)

const HotelCommentsCounter = ({ l, $, ...props }) => {

	const { commentsCount } = props

	const txtCommentsCount = l(`{commentsCount, plural,
		=0 {Нет отзывов}
		one {{commentsCount} отзыв}
		few {{commentsCount} отзыва}
		many {{commentsCount} отзывов}
	}`, {
		commentsCount
	})
	const txtDescription = l(`{commentsCount, plural,
		=0 {написанных гостями}
		one {написанный гостями}
		few {написано гостями}
		many {написано гостями}
	}`, {
		commentsCount
	})

	return (
		<div>
			<div className={$.content}>
				{txtCommentsCount}
			</div>
			<div className={$.description}>{txtDescription}</div>
		</div>
	)
}

export default enhancer(HotelCommentsCounter)
