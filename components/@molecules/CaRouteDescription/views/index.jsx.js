import { createEnhancer } from '@utils/decoract'
import { layouts } from '@utils/taffy'

import T414 from './layouts/t414.jsx.js'
import F415t768 from './layouts/f415t768.jsx.js'
import F769 from './layouts/f769.jsx.js'

const cq = {
	t414: {
		maxWidth: 414
	},
	f415t768: {
		minWidth: 415,
		maxWidth: 768
	},
}

const enhancer = createEnhancer({ cq })

const MainView = ({ cq, l, ...props }) => {
	const { t414, f415t768 } = cq
	const {
		workingYears,
		paxCount,
		src,
		dst,
		inboundDate,
		outboundDate,
		consist,
		allVarUrlParam,
		channel,
		isSuccessMsg,
		cabinClass
	} = props

	const txtCabinClass = l(`{cabinClass, select,
		econom {эконом}
		business {бизнес}
		other {{cabinClass}}
	}`, { cabinClass })
	const txtWhyTitle = l('Почему Clickavia')
	const txtWhyContent = l('Потому что мы умеем находить самые дешевые билеты, которые не умеют искать другие.')
	const txtSatisfactionTitle = l('Довольные пассажиры')
	const txtSatisfactionContent = l(`За ${workingYears} лет работы мы сделали счастливыми 
		{paxCount, plural,
			one {# пассажира}
			few {# пассажира}
			many {# пассажиров}
		}!`, { paxCount })
	const txtRoute = l(`{src} {arrow} {dst}`, {
		src,
		dst,
		arrow: inboundDate ? '⇄' : '→'
	})
	// prepare humanaized texts for consist
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
	let txtConsist
	let txtAndParticle = 'и'
	if (humanizedConsist.length === 3) {
		txtConsist = `${humanizedConsist[0]}, ${humanizedConsist[1]} ${txtAndParticle} ${humanizedConsist[2]}`
	}
	else {
		txtConsist = humanizedConsist.join(` ${txtAndParticle} `)
	}
	// prepare humanized texts for route dates
	const formatDate = (val) => {
		const txtDay = l.date(val, 'longMonth')
		const txtWeekdayPrefix = val.getDay() === 2 ? l('во') : l('в')
		let txtWeekday = l.date(val, 'weekday')
		if (l.lang === 'ru-RU') {
			txtWeekday = txtWeekday.replace(/а$/, 'у')
		}
		return `${txtDay}, ${txtWeekdayPrefix} ${txtWeekday}`
	}
	const txtThere = inboundDate ? l('Туда — ') : ''
	const txtOutboundDate = `${txtThere}${formatDate(outboundDate)}`
	let txtInboundDate = ''
	if (inboundDate) {
		txtInboundDate = `Обратно — ${formatDate(inboundDate)}`
	}
	// prepare props for newSearchBtn and allVariantsBtn
	const isDefaultChannel = channel !== 'net_aviasales'
		&& channel !== 'skyscanner' && channel !== 'momondo'
	const propsNewSearchBtn = {
		type: isDefaultChannel ? 'darkUnderline' : 'whiteUnderline',
		title: l('Новый поиск'),
		onClick: () => window.location.href = 'https://www.clickavia.ru/'
	}
	const propsAllVariantsBtn = {
		type: isDefaultChannel ? 'darkLeftArrow' : 'leftArrow',
		title: l('Все варианты'),
		onClick: () => window.location.href = 'https://www.clickavia.ru/' + allVarUrlParam
	}

	const propsLayout = {
		propsNewSearchBtn,
		propsAllVariantsBtn,
		isSuccessMsg,
		txtWhyTitle,
		txtWhyContent,
		txtSatisfactionTitle,
		txtSatisfactionContent,
		txtRoute,
		txtOutboundDate,
		txtInboundDate,
		txtConsist,
		txtCabinClass,
	}

	const Layout = layouts([
		[ T414, t414 ],
		[ F415t768, f415t768 ],
		[ F769, (!t414 && !f415t768) ]
	])

	return <Layout {...propsLayout}/>
}

export default enhancer(MainView)
