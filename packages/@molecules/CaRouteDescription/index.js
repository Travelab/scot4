import { last, padStart } from 'lodash'
import { createEnhancer } from '@utils/decoract'
import confy from '@utils/confy'

import CaButton from '@atoms/CaButton'
import style from './styles/index.js'

const cq = {
	t414: {
		maxWidth: 414
	}
}

const enhancer = createEnhancer({
	style,
	cq
})

const CABIN_CLASSES = {
	econom: 'эконом',
	business: 'бизнес'
}

const CaRouteDescription = ({ $, l, cq, ...props }) => {
	const { t414 } = cq
	const { offer, isSuccessMsg } = props

	const firstSegment = offer.flights[0].segments[0]
	const lastSegment = last(offer.flights).segments[0]

	const { city: src, airport: srcAirport } = firstSegment.depart
	const { city: dst, airport: dstAirport } = last(offer.flights[0].segments).arrive
	const consist = firstSegment.consist

	const localOutboundDate = new Date(firstSegment.depart.time + 'Z')
	const outboundDate = new Date(localOutboundDate.getUTCFullYear(), localOutboundDate.getUTCMonth(), localOutboundDate.getUTCDate(), localOutboundDate.getUTCHours(), localOutboundDate.getUTCMinutes())
	const localInboundDate = offer.flights.length > 1 ? new Date(lastSegment.depart.time + 'Z') : null
	const inboundDate = localInboundDate && new Date(localInboundDate.getUTCFullYear(), localInboundDate.getUTCMonth(), localInboundDate.getUTCDate(), localInboundDate.getUTCHours(), localInboundDate.getUTCMinutes())

	const cabinClass = CABIN_CLASSES[firstSegment['cabin_class']] || firstSegment['cabin_class']

	const txtNewSearch = l('Новый поиск')
	const txtAllVariants = l('Все варианты')

	const txtWhyTitle = l('Почему Clickavia')
	const txtWhyContent = l('Потому что мы умеем находить самые дешевые билеты, которые не умеют искать другие.')

	const txtSatisfactionTitle = l('Довольные пассажиры')
	const countYears = (new Date()).getFullYear() - confy.get('CONTACTS.clickavia').foundationYear
	const txtSatisfactionContent = l(`За 9 лет работы мы сделали счастливыми 212 691 пассажиров!`)

	const txtRoute = l(`{src} {arrow} {dst}`, {
		src,
		dst,
		arrow: '→'
	})

	const humanizedConsist = []
	if (consist[0] > 0) humanizedConsist.push(
		l(`{count, plural,
			one {{count} взрослый}
			few {{count} взрослых}
			many {{count} взрослых}
		}`, {
			count: consist[0]
		})
	)
	if (consist[1] > 0) humanizedConsist.push(
		l(`{count, plural,
			one {ребенок}
			few {{count} ребенка}
			many {{count} детей}
		}`, {
			count: consist[1]
		})
	)
	if (consist[2] > 0) humanizedConsist.push(
		l(`{count, plural,
			=0 {}
			one {младенец}
			few {{count} младенца}
			many {{count} младенцев}
		}`, {
			count: consist[2]
		})
	)
	let formatConsist
	let txtAndParticle = 'и'
	if (humanizedConsist.length === 3) {
		formatConsist = `${humanizedConsist[0]}, ${humanizedConsist[1]} ${txtAndParticle} ${humanizedConsist[2]}`
	}
	else {
		formatConsist = humanizedConsist.join(` ${txtAndParticle} `)
	}

	const formatDate = (val) => {
		const txtDay = l.date(val, 'longMonth')
		const txtWeekdayPrefix = val.getDay() === 2 ? l('во') : l('в')
		let txtWeekday = l.date(val, 'weekday')
		if (l.lang === 'ru-RU') {
			txtWeekday = txtWeekday.replace(/а$/, 'у')
		}
		return `${txtDay}, ${txtWeekdayPrefix} ${txtWeekday}`
	}
	const txtOutboundDate = `${formatDate(outboundDate)}`
	let txtInboundDate = ''
	if (inboundDate) {
		txtInboundDate = `Обратно — ${formatDate(inboundDate)}`
	}

	const newSearchClickHandler = () => {
		window.location.href = 'https://www.clickavia.ru/'
	}

	const srcParam = srcAirport.metro
	const dstParam = dstAirport.metro
	const outboundDateParam = outboundDate.getFullYear()
		+ '-' + padStart((outboundDate.getMonth() + 1), 2, '0')
		+ '-' + padStart(outboundDate.getDate(), 2, '0')
	const inboundDateParam = inboundDate
		? inboundDate.getFullYear()
			+ '-' + padStart((inboundDate.getMonth() + 1), 2, '0')
			+ '-' + padStart(inboundDate.getDate(), 2, '0')
		: '_'
	const consistParam = consist.join('/')
	const allVarUrlParam = srcParam + '/' + dstParam + '/'
		+ outboundDateParam + '/' + inboundDateParam + '/' + consistParam

	const allVariantsClickHandler = () => {
		window.location.href = 'https://www.clickavia.ru/' + allVarUrlParam
	}

	const renderF414Top = () => (
		<div className={$.top}>
			<div className={$.left}>
				<CaButton title={txtNewSearch} type='whiteUnderline' onClick={newSearchClickHandler}/>
				<CaButton title={txtAllVariants} type='leftArrow' onClick={allVariantsClickHandler}/>
			</div>
			<div className={$.right}>
				<div className={$.why}>
					<div className={$.title}>{txtWhyTitle}</div>
					<div className={$.content}>{txtWhyContent}</div>
				</div>
				<div className={$.satisfaction}>
					<div className={$.title}>{txtSatisfactionTitle}</div>
					<div className={$.content}>{txtSatisfactionContent}</div>
				</div>
			</div>
		</div>
	)

	const renderF414Layout = () => (
		<div className={$.container}>
			{ !isSuccessMsg ? renderF414Top() : null }
			<div className={$.bottom}>
				<div className={$.route}>
					Ваши билеты по направлению {txtRoute}
					{isSuccessMsg ? l(' оформлены') : null}
				</div>
				<div className={$.details}>{`${txtOutboundDate}. ${txtInboundDate}`}</div>
				<div className={$.details}>{formatConsist}, {cabinClass}</div>
			</div>
		</div>
	)

	const renderT414Top = () => (
		<div className={$.t414Top}>
			<CaButton title={txtAllVariants} type='leftArrow' onClick={allVariantsClickHandler}/>
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.container}>
			{ !isSuccessMsg ? renderT414Top() : null }
			<div className={$.t414Bottom}>
				<div className={$.t414Route}>
					<div>Ваши билеты по направлению</div>
					{txtRoute}
					{isSuccessMsg ? l(' оформлены') : null}
				</div>
				<div className={$.t414Details}>{txtOutboundDate}</div>
				<div className={$.t414Details}>{txtInboundDate}</div>
				<div className={$.t414Details}>{formatConsist}, {cabinClass}</div>
			</div>
		</div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
}

export default enhancer(CaRouteDescription)
