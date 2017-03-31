import { createEnhancer } from '@utils/decoract'

import Tooltip from '@atoms/Tooltip'

import style from '../styles/ticketsTypeExplanatory.js'

const enhancer = createEnhancer({ style })

const TicketsTypeExplanatory = (({ $, l, ...props }) => {
	const { type } = props

	const txtGist = l('В чем суть?')
	const txtCharterType = l('Это чартерный рейс')
	const txtRegularType = l('Регулярный рейс')
	const txtHubType = l('Составной маршрут')
	const txtCharterTooltip1 = l('Выписка и рассылка электронных билетов происходит строго накануне вылета с 15:00 до 21:00. Это специфика выписки данного вида билетов.')
	const txtCharterTooltip2 = l('Все документы вы получите на электронную почту, указанную при регистрации. После отправки документов вам придет sms-уведомление об этом.')
	const txtCharterTooltip3 = l('В случае необходимости для оформления визы вы можете воспользоваться бланком подтверждения оплаты заказа, который приложен письму.')
	const txtHubTooltip = l('Вы покупаете несколько авиабилетов. Вам придется пройти регистрацию и самостоятельно зарегистрировать багаж на каждый рейс по отдельности. Если вы опоздаете на рейс, либо рейс отменят, авиакомпания не обязана компенсировать вам стоимость билета.')
	const txtRegularTooltip1 = l('При покупке билетов на регулярные линии документы приходят на вашу электронную почту в течение двух часов с момента оплаты.')
	const txtRegularTooltip2_1 = l('Если по какой-либо причине вы не получили билеты на почту, свяжитесь с менеджером по адресу ')
	const txtRegularTooltip2_2 = l(', указав номер вашего заказа.')
	const txtRegularTooltip3 = l('Наш менеджер свяжется с авиаперевозчиком и решит проблему в самые кратчайшие сроки.')

	const regularTooltip = (
		<div>
			<p>{txtRegularTooltip1}</p>
			<p>
				{txtRegularTooltip2_1}
				<a href='mailto:info@clickavia.ru' style={{ color: 'inherit' }}>info@clickavia.ru</a>
				{txtRegularTooltip2_2}
			</p>
			<p>{txtRegularTooltip3}</p>
		</div>
	)
	const charterTooltip = (
		<div>
			<p>{txtCharterTooltip1}</p>
			<p>{txtCharterTooltip2}</p>
			<p>{txtCharterTooltip3}</p>
		</div>
	)
	const hubTooltip = (
		<div>
			<p>{txtHubTooltip}</p>
		</div>
	)
	const tooltipContentByType = {
		'charter': charterTooltip,
		'regular': regularTooltip,
		'hub': hubTooltip
	}
	const txtByType = {
		'charter': txtCharterType,
		'regular': txtRegularType,
		'hub': txtHubType
	}

	const tooltipContent = tooltipContentByType[type]
	const txtType = txtByType[type]

	return (
		<div className={$.charterInfo}>
			<div>{txtType}</div>
			<Tooltip content={tooltipContent} placement='left' behavior='onHover'>
				<a className={$.charterGist}>{txtGist}</a>
			</Tooltip>
		</div>
	)
})

export default enhancer(TicketsTypeExplanatory)
