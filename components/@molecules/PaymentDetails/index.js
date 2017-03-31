import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'
import LoadingSpinner from '@atoms/LoadingSpinner'

import style from './styles/index.js'
import duck from './ducks'

const cq = {
	t414: {
		maxWidth: 414
	},
	f415t768: {
		minWidth: 415,
		maxWidth: 768
	},
}

const enhancer = createEnhancer({
	duck,
	cq,
	style: style(),
})

const PaymentDetails = ({ $, l, cq, state, actions, ...props }) => {
	const { t414, f415t768 } = cq
	const { agreeWithRules } = state
	const { toggleCheckbox, buy } = actions
	const { order, fares, totalPrice, agreements, paymentProcessing, isCharter } = props

	const FARE_TYPE_TITLES = {
		transfer: l('Билет'),
		accomodation: l('Отель'),
		insurance: l('Страховка')
	}
	const fareTypeCounts = {}
	const renderedFares = fares.map((fare) => {
		if (!fareTypeCounts[fare.service.type]) {
			fareTypeCounts[fare.service.type] = 0
		}
		fareTypeCounts[fare.service.type] += 1
		const number = fareTypeCounts[fare.service.type]
		const quantity = fare.quantity

		const title = FARE_TYPE_TITLES[fare.service.type] || fare.service.type
		let txtFareTitle
		if (fare.service.type === 'accomodation') {
			txtFareTitle = l(`{title} {number} на {quantity, plural,
				one {{quantity} гостя}
				few {{quantity} гостей}
				many {{quantity} гостей}
			}`, { title, number, quantity })
		}
		else if (fare.service.type === 'insurance') {
			txtFareTitle = l(`{title} {number} на {quantity, plural,
				one {{quantity} застрахованного}
				few {{quantity} застрахованных}
				many {{quantity} застрахованных}
			}`, { title, number, quantity })
		}
		else {
			txtFareTitle = l(`{title} {number} на {quantity, plural,
				one {{quantity} пассажира}
				few {{quantity} пассажиров}
				many {{quantity} пассажиров}
			}`, { title, number, quantity })
		}

		return (
			<div className={$.fare} key={fare.id}>
				<div className={$.fareTitle}>{txtFareTitle}</div>
				<div className={$.fareSize}>{l.currency(fare.price.buyer, 'RUB')}</div>
			</div>
		)
	})

	const renderAgreements = () => {
		const txtAndParticle = l('и')

		const agreementsList = agreements.map((agreement, idx) => {
			const agreementLink = <a href={agreement.link}>{agreement.title}</a>
			if (idx === 0 || agreements.length === 1) {
				return <span key={agreement.id}>{agreementLink}</span>
			}
			else {
				return <span key={agreement.id}>, {agreementLink}</span>
			}
		})
		const txtAgreeRules = l('Принимаю условия')
		const txtPersonalData = l('и согласен на обработку введенных персональных данных')

		return (
			<div className={$.agreementsList}>
				{txtAgreeRules} {agreementsList} {txtPersonalData}
			</div>
		)
	}

	const txtTotal = l('Итого')
	const txtCurrencyExchange = l(`Если ваша карта не в рублях, то стоимость будет сконвертирована
		по курсу вашего банка.`)

	const onBuyHandler = () => buy()

	const isBtnEnabled = agreeWithRules && order && order.canPay && !paymentProcessing

	const txtOrderNotReady = l('Уточняем итоговую стоимость билетов')

	const renderOrderNotReadyMsg = () => (
		<div className={$.orderNotReadyMsg}>
			<span>{ txtOrderNotReady }</span>
			<div className={$.loaderWrapper}>
				<LoadingSpinner clickaviaStyle/>
			</div>
		</div>
	)

	const renderFares = () => (
		<div className={$.fares}>
			{renderedFares}
			<div className={$.total}>
				<div className={$.totalTitle}>{txtTotal}</div>
				<div className={$.fareSize}>{l.currency(totalPrice, 'RUB')}</div>
			</div>
			<div className={$.currencyExchange}>{txtCurrencyExchange}</div>
		</div>
	)

	const txtBuy = t414 || f415t768 ? l('Оплатить') : l('Купить')
	const txtAfterBuy1 = l(`После нажатия кнопки «${txtBuy}» итоговая стоимость будет списана с вашей карты и в течение `)
	const txtAfterBuy2Charter = l(`пяти минут вы получите подтверждение вашего заказа на указанный адрес электронной почты.`)
	const txtAfterBuy2Regular = l(`пяти минут вы получите электронные авиабилеты на указанный адрес электронной почты.`)
	const txtAfterBuy2 = isCharter ? txtAfterBuy2Charter : txtAfterBuy2Regular
	const txtAfterBuy = `${txtAfterBuy1}${txtAfterBuy2}`

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.faresWrapper}>
				{order ? renderFares() : renderOrderNotReadyMsg()}
			</div>
			<div className={$.controls}>
				<label className={$.agreements}>
					<div className={$.checkbox}>
						<input type='checkbox' checked={agreeWithRules} onChange={toggleCheckbox}/>
					</div>
					{agreements.length > 0 && renderAgreements()}
				</label>
				<div className={$.btn}>
					<CaButton title='Купить' type='bigOrange' onClick={onBuyHandler} disabled={!isBtnEnabled}/>
				</div>
			</div>
			<div className={$.afterBuy}>
				{txtAfterBuy}
			</div>
		</div>
	)

	const t414BuyBtnTitle = order
		? l('Оплатить {price}', {
				price: l.currency(totalPrice, 'RUB')
			})
		: renderOrderNotReadyMsg()
	const propsT414BuyBtn = {
		title: t414BuyBtnTitle,
		type: 'bigMobileOrange',
		onClick: onBuyHandler,
		disabled: !agreeWithRules
	}

	const renderT414Layout = () => (
		<div className={$.t414Container}>
			<div className={$.t414Controls}>
				<label className={$.agreements}>
					<div className={$.t414CheckboxWrapper}>
						<input className={$.customCheckbox} type='checkbox' checked={agreeWithRules} onChange={toggleCheckbox}/>
						<span/>
					</div>
					{renderAgreements()}
				</label>
				<div className={$.t414Btn}>
					<CaButton { ...propsT414BuyBtn }/>
				</div>
				<div className={$.afterBuy}>
					{txtAfterBuy}
				</div>
			</div>
		</div>
	)


	return t414 || f415t768 ? renderT414Layout() : renderF414Layout()
}

export default enhancer(PaymentDetails)
