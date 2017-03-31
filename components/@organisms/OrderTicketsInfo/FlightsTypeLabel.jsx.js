import { createEnhancer } from '@utils/decoract'

import Tooltip from '@atoms/Tooltip'
import CaButton from '@atoms/CaButton'

import style from './styles/flightsTypeLabel.js'

const enhancer = createEnhancer({ style })

const FlightsTypeLabel = ({ $, l, ...props }) => {
	const { type, onShowRulesClick, t414 } = props

	const txtFlightType = l(`{type, select,
		blockcharter {Чартер}
		charter {Чартер}
		regular {Регулярный}
		low-cost {Лоукостер}
	}`, { type })
	const txtCharterTooltip1 = l('Выписка и рассылка электронных билетов происходит строго накануне вылета с 15:00 до 21:00. Это специфика выписки данного вида билетов.')
	const txtCharterTooltip2 = l('Все документы вы получите на электронную почту, указанную при регистрации. После отправки документов вам придет sms-уведомление об этом.')
	const txtCharterTooltip3 = l('В случае необходимости для оформления визы вы можете воспользоваться бланком подтверждения оплаты заказа, который приложен письму.')
	const txtLowcosterTooltip = l('По условиям покупки, билеты, выписанные по данному виду тарифа, обмену и возврату не подлежат.')
	const txtRegularTooltip1 = l('При покупке билетов на регулярные линии документы приходят на вашу электронную почту в течение двух часов с момента оплаты.')
	const txtRegularTooltip2_1 = l('Если по какой-либо причине вы не получили билеты на почту, свяжитесь с менеджером по адресу ')
	const txtRegularTooltip2_2 = l(', указав номер вашего заказа.')
	const txtRegularTooltip3 = l('Наш менеджер свяжется с авиаперевозчиком и решит проблему в самые кратчайшие сроки.')

	const flightTypeClass = {
		'blockcharter': $.flightCharter,
		'charter': $.flightCharter,
		'regular': $.flightRegular,
		'low-cost': $.flightLowcoster,
	}

	const propsShowRulesBtn = {
		title: l('Показать правила тарифа'),
		type: 'typeOfFlightGray',
		onClick: () => setTimeout(onShowRulesClick, 10)
	}
	const regularTooltip = (
		<div>
			<p>{txtRegularTooltip1}</p>
			<p>
				{txtRegularTooltip2_1}
				<a href='mailto:info@clickavia.ru' style={{ color: 'inherit' }}>info@clickavia.ru</a>
				{txtRegularTooltip2_2}
			</p>
			<p>{txtRegularTooltip3}</p>
			<div className={$.showRulesBtn}>
				<CaButton {...propsShowRulesBtn}/>
			</div>
		</div>
	)
	const charterTooltip = (
		<div>
			<p>{txtCharterTooltip1}</p>
			<p>{txtCharterTooltip2}</p>
			<p>{txtCharterTooltip3}</p>
		</div>
	)
	const lowcosterTooltip = (
		<div>
			<p>{txtLowcosterTooltip}</p>
		</div>
	)
	const tooltipContentByType = {
		'charter': charterTooltip,
		'regular': regularTooltip,
		'low-cost': lowcosterTooltip
	}

	const tooltipContent = tooltipContentByType[type]
	const placement = t414 ? 'top' : 'right'

	return (
		<div className={flightTypeClass[type]}>
			<Tooltip content={tooltipContent} placement={placement}>
				{txtFlightType}
			</Tooltip>
		</div>
	)
}

export default enhancer(FlightsTypeLabel)
