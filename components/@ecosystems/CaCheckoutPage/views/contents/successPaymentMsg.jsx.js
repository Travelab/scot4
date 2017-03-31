import { last, padStart } from 'lodash'
import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'

import style from '../../styles/successPaymentMsg.js'

import icoCheckMark from '../../img/icon-check.svg'

const enhancer = createEnhancer({
	style
})

const SuccessPaymentMsg = ({ $, l, ...props }) => {

	const { orderNum, offer, f960 } = props

	const firstSegment = offer.flights[0].segments[0]
	const lastSegment = last(last(offer.flights).segments)

	const srcCity = firstSegment.depart.city
	const dstCity = last(offer.flights[0].segments).arrive.city
	const consist = firstSegment.consist

	const outboundDate = new Date(firstSegment.depart.time)
	const inboundDate = offer.flights.length > 1 ? new Date(lastSegment.depart.time) : null

	const outboundDateParam = outboundDate.getFullYear()
		+ '-' + padStart((outboundDate.getMonth() + 1), 2, '0')
		+ '-' + padStart(outboundDate.getDate(), 2, '0')
	const inboundDateParam = inboundDate
		? inboundDate.getFullYear()
			+ '-' + padStart((inboundDate.getMonth() + 1), 2, '0')
			+ '-' + padStart(inboundDate.getDate(), 2, '0')
		: '_'
	const consistParam = consist.join('/')
	const tlSearchUrl = 'search/' + srcCity + '/' + dstCity + '/'
		+ outboundDateParam + '/' + inboundDateParam + '/'
		+ '0/0/' + consistParam

	const txtOrderNum = l('Номер заказа: {orderNum}', { orderNum })
	const txtOrderInfo1 = l('Билеты выписаны и всё необходимое отправлено на ваш электронный адрес.')
	const txtOrderInfo2 = l('Также вся информация о вашем заказе доступна в ')
	const txtUserAccount = l('личном кабинете')
	const txtAddToGoggle = l('Добавить поездку в Google.Календарь')
	const txtBuyAnotherOneTicket = l('Купить еще один билет')
	const txtLookAtHotels = l(`Посмотреть отели в ${dstCity}`)

	const btnsClass = f960 ? $.btns : $.t959Btns

	const propsBuyAnotherOneBtn = {
		type: 'successForm',
		title: txtBuyAnotherOneTicket,
		onClick: () => window.location.href = 'https://www.clickavia.ru/'
	}
	const propsLookAtHotelsBtn = {
		type: 'successForm',
		title: txtLookAtHotels,
		onClick: () => window.location.href = 'https://www.travelab.com/' + tlSearchUrl
	}

	const CheckIcon = f960
	? () => (
			<div className={$.checkIconWrapper}>
				<img src={icoCheckMark} alt='check'/>
			</div>
		)
	: () => null

	return (
		<div className={$.container}>
			<div className={$.mainInfo}>
				<CheckIcon/>
				<div className={$.orderInfo}>
					<div className={$.orderNum}>
						{txtOrderNum}
					</div>
					<div className={$.additionalContent}>
						<div>{txtOrderInfo1}</div>
						{ /*uncomment for add user account link*/
							/*<div>
								{txtOrderInfo2}<a className={$.userAccountLink} href='#'>{txtUserAccount}</a>.
						</div>*/}
					</div>
				</div>
			</div>
			<div className={btnsClass}>
				<div className={$.buyAnotherOneTicketBtn}>
					<CaButton { ...propsBuyAnotherOneBtn }/>
				</div>
				<div className={$.lookAtHotelsBtn}>
					<CaButton { ...propsLookAtHotelsBtn }/>
				</div>
			</div>
		</div>
	)
}

export default enhancer(SuccessPaymentMsg)
