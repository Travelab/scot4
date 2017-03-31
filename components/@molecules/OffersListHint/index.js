import { createEnhancer } from '@utils/decoract'

import duck from './ducks'
import style from './styles'
import closeImg from './images/close.svg'
import flightImg from './images/flight.svg'
import homeImg from './images/home.svg'

const enhancer = createEnhancer({ duck, style: style(), withLang: true })

const OffersListHint = ({ l, $, state, actions, ...props }) => {
	const { isOpened } = state

	if (!isOpened) return null

	const { closeHint } = actions
	const { cardStyle, margin } = props

	const wrapClass = margin ? $.marginedHint : $.hint
	if (cardStyle) {
		const txtHint = l(
			`Мы сразу показываем итоговую цену, которая включает не только проживание,
			но и перелет на всех путешественников.
			Варианты перелета вы сможете выбрать после выбора отеля.`
		)
		const txtBtn = l('Понятно, закрыть')

		return (
			<div className={wrapClass}>
				<div className={$.mobileContainer}>
					<div className={$.mobileHeader}>
						<img src={flightImg}/>
						<span className={$.plus}>+</span>
						<img src={homeImg}/>
					</div>
					<div className={$.mobileContent}>
						{txtHint}
					</div>
					<div className={$.mobileControl} onClick={() => closeHint()}>
						{txtBtn}
					</div>
				</div>
			</div>
		)
	}
	else {
		const txtLeftPart = l('Указанные цены включают перелет и проживание на всех туристов за весь срок')
		const txtRightPart = l('Вы сможете выбрать вариант перелета после выбора отеля')

		return (
			<div className={wrapClass}>
				<div className={$.controls}>
					<img src={closeImg} className={$.closeBtn} onClick={() => closeHint()}/>
				</div>
				<div className={$.container}>
					<div className={$.leftPart}>{txtLeftPart}</div>
					<div className={$.rightPart}>{txtRightPart}</div>
				</div>
			</div>
		)
	}
}

export default enhancer(OffersListHint)
