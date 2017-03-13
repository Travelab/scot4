import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'
import InfoMsg from './InfoMsg.jsx.js'

import style from './styles/unavail.js'

const enhancer = createEnhancer({
	style
})

const Unavail = ({ $, l, ...props }) => {

	const { price, f960 } = props

	const txtTitle = l('К сожалению, этот билет больше недоступен')
	const txtContent = l('Авиакомпания не смогла подтвердить наличие мест по этому тарифу. Такое, увы, бывает и не зависит от нас. Мы можем предложить вам эти же рейсы по другому тарифу.')

	const onNewSearchClick = () => {
		window.location.href = 'https://www.clickavia.ru/' // TODO: redirect to main
	}
	const onBuyClick = () => {} // TODO: handle click

	const propsNewSearchBtn = {
		title: l('Выбрать новый вариант перелета'),
		type: price ? 'lightGreen' : 'green',
		onClick: onNewSearchClick
	}
	const propsBuyBtn = {
		title: l(`Купить эти же рейсы за ${price}`),
		type: 'green',
		onClick: onBuyClick
	}

	const contentUnavail = (
		<div className={$.contentUnavail}>
			{txtContent}
		</div>
	)

	const newSearchBtn = (
		<div className={$.newSearchBtnWrapper}>
			<CaButton { ...propsNewSearchBtn } />
		</div>
	)
	const buyBtn = price && (
		<div className={$.buyBtnWrapper}>
			<CaButton { ...propsBuyBtn } />
		</div>
	)

	const btnsClass = f960 ? $.btns : $.t959Btns
	const btns = (
		<div className={btnsClass}>
			{ buyBtn }
			{ newSearchBtn }
		</div>
	)

	const propsInfoMsg = {
		title: txtTitle,
		content: contentUnavail,
		footer: btns,
	}

	return (
		<div className={$.container}>
			<InfoMsg { ...propsInfoMsg } />
		</div>
	)
}

export default enhancer(Unavail)
