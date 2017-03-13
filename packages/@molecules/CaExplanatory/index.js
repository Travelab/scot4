import ReactTooltip from 'react-tooltip'
import { createEnhancer } from '@utils/decoract'
import { some } from 'lodash'

import LoadingSpinner from '@atoms/LoadingSpinner'

import style from './styles/index.js'
import warningImg from './images/warning.svg'

const cq = {
	t414: {
		maxWidth: 414
	}
}

const enhancer = createEnhancer({
	style,
	cq
})

const CaExplanatory = ({ $, l, cq, ...props }) => {
	const { t414 } = cq
	const { offer, isOrderReady, showMotivation } = props
	const countFares = offer.flightFares.length
	const isCharter = some(offer.segments, (segment) => (segment.type === 'charter'))

	let humanizedCountSup
	switch (countFares) {
		case 1:
			humanizedCountSup = ''
			break
		case 2:
			humanizedCountSup = l('двух')
			break
		case 3:
			humanizedCountSup = l('трех')
			break
		case 4:
			humanizedCountSup = l('четырех')
			break
		case 5:
			humanizedCountSup = l('пяти')
			break
		case 6:
			humanizedCountSup = l('шести')
			break
		default:
			humanizedCountSup = countFares
	}
	const txtTech = l(`Наша технология позволяет комбинировать авиабилеты от {count}разных надежных поставщиков.`, {
		count: humanizedCountSup ? `${humanizedCountSup} ` : ''
	})
	const txtTechHint = l('Поэтому у нас так дешево.')

	const txtTickets = l('Вы оплачиваете прямо здесь и получаете электронные билеты.')
	const txtPayment = l('Оплата автоматически уходит нашим поставщикам')

	const txtOrderNotReady = l('Уточняем итоговую стоимость билетов')

	const txtPrice = l(`Итоговая стоимость за всех пассажиров — {price} рублей`, {
		price: l.number(offer.price)
	})
	const txtPriceHint = l('При оплате банковской картой')

	const renderCharterInfo = () => {
		const txtCharter = l('Это чартерный рейс. Поэтому такая цена')
		const txtCharterGist = l('В чем суть?')

		const txtTolltip1 = l(`
			Выписка и рассылка электронных билетов происходит строго за день до вылета с 15:00 до 21:00.
			Это специфика выписки данного вида билетов. Все документы вы получите на почту, указанную при регистрации.
			Так же вам придет sms уведомление после отправки документов.`)
		const txtTolltip2 = l(`Для оформления визы вы сможете использовать бланк подтверждения оплаты заказа,
			который высылается на вашу почту после завершения оформления заказа.`)
		const txtTolltip3 = l('По условиям покупки, билеты, выписанные по данному виду тарифа, обмену/возврату не подлежат.')

		return (
			<div className={$.charterInfo}>
				<div>{txtCharter}</div>
				{/*uncomment code below when fix bug with ReactTooltip in Safari9/iOS9 or change tooltip*/}
				{/*<a className={$.charterGist} data-tip='gist' data-for='charterGist' data-event='click focus'>{txtCharterGist}</a>
				<ReactTooltip id='charterGist' aria-haspopup='true' effect='solid' place='left' globalEventOff='click'>
					<p className={$.tooltip}>{txtTolltip1}</p>
					<p className={$.tooltip}>{txtTolltip2}</p>
					<p className={$.tooltip}>{txtTolltip3}</p>
				</ReactTooltip>*/}
			</div>
		)
	}

	const renderMotivation = () => {
		const txtMotivation = l('К сожалению, из-за падения рубля, цены повышаются. Завтра эти билеты будут дороже.')
		const txtSincerelyAdvice = l('Искренне советуем покупать сегодня.')

		return (
			<div className={$.motivation}>
				<div className={$.motivationIco}>
					<img src={warningImg}/>
				</div>
				<div className={$.motivationText}>
					{txtMotivation}
					<br/>
					{txtSincerelyAdvice}
				</div>
			</div>
		)
	}

	const renderOrderNotReadyMsg = () => (
		<div className={$.orderNotReadyMsg}>
			<span>{ txtOrderNotReady }</span>
			<div className={$.loaderWrapper}>
				<LoadingSpinner clickaviaStyle />
			</div>
		</div>
	)

	const renderPrice = () => (
		<div className={$.price}>
			<div>{txtPrice}</div>
			<div className={$.priceHint}>{txtPriceHint}</div>
		</div>
	)

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.wrap}>
				<div className={$.tech}>
					<div className={$.techText}>{txtTech}</div>
					<div className={$.techHint}>{txtTechHint}</div>
				</div>
				<div className={$.mainIdea}>
					<div>{txtTickets}</div>
					<div>{txtPayment}</div>
				</div>

				<div className={$.info}>
					{ isOrderReady ? renderPrice() : renderOrderNotReadyMsg() }
					{showMotivation && renderMotivation()}
					{isCharter && renderCharterInfo()}
				</div>
			</div>
		</div>
	)
	const renderT414Price = () => (
		<div className={$.t414Price}>
			<div>{txtPrice}</div>
			<div className={$.priceHint}>{txtPriceHint}</div>
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.container}>
			<div className={$.t414Wrap}>
				<div className={$.t414Tech}>
					<div className={$.techText}>{txtTech}</div>
					<div className={$.techHint}>{txtTechHint}</div>
				</div>

				<div className={$.t414MainIdea}>
					<div>{txtTickets}</div>
					<div>{txtPayment}</div>
				</div>

				<div className={$.t414Info}>
					{ isOrderReady ? renderT414Price() : renderOrderNotReadyMsg() }
				</div>
			</div>
		</div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
}

export default enhancer(CaExplanatory)
