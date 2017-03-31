import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'
import OverlayWrapper from '@molecules/OverlayWrapper'

import style from './styles/tariffRules.js'

const icoCheckedBaggage = '//placehold.it/16'
const icoCabinBaggage = '//placehold.it/16'
const icoChangeRule = '//placehold.it/16'
const icoRefundRule = '//placehold.it/16'

const enhancer = createEnhancer({ style })

const TariffRules = ({ $, l, ...props }) => {
	const { closeHandler, condition, t959 } = props

	const { checked, unchecked } = condition.baggage
	const txtBaggageAmount = (count, type) => (
		l(`
			{count, plural,
				=1 {# место}
				one {# место}
				few {# места}
				many {# мест}
			} {type, select,
				unchecked {ручной клади}
				checked {багажа}
				other {}
			}
		`, {
			count,
			type
		})
	)
	const txtBaggageWeight = (baggage) => {
		const uniqItems = []
		const countUniqItems = {}

		baggage.forEach((weight) => {
			if (countUniqItems[weight]) countUniqItems[weight]++
			else {
				uniqItems.push(weight)
				countUniqItems[weight] = 1
			}
		})

		return uniqItems
			.map((weight) => {
				let str = l('до {weight, number} кг', { weight })
				const count = countUniqItems[weight]
				if (count > 1) str += ` × ${count}`

				return str
			})
			.join(' + ')
	}

	const txtCheckedBaggageInfo = checked.length
		? txtBaggageAmount(checked.length) + txtBaggageWeight(checked)
		: ''
	const txtCabinBaggageInfo = unchecked.length
		? txtBaggageAmount(unchecked.length) + txtBaggageWeight(unchecked)
		: ''
	const txtChangeRuleInfo = ''
	const txtRefundRuleInfo = condition.refundable ? 'Есть' : ''

	const propsCloseBtn = {
		title: l('Закрыть'),
		type: 'lightGreen',
		onClick: closeHandler
	}
	const propsCheckedBaggage = {
		title: l('Багаж '),
		icon: icoCheckedBaggage,
		caption: txtCheckedBaggageInfo ? txtCheckedBaggageInfo : null
	}
	const propsCabinBaggage = {
		title: l('Ручная кладь '),
		icon: icoCabinBaggage,
		caption: txtCabinBaggageInfo ? txtCabinBaggageInfo : null
	}
	const propsChangeRule = {
		title: l('Обмен '),
		icon: icoChangeRule,
		caption: txtChangeRuleInfo ? txtChangeRuleInfo : null
	}
	const propsRefundRule = {
		title: l('Возврат '),
		icon: icoRefundRule,
		caption: txtRefundRuleInfo ? txtRefundRuleInfo : null
	}
	const ShortInfoItem = ({ title, icon, caption }) => {
		const iconClass = caption ? $.icon : $.crossIcon
		const txtCaption = caption ? caption : l('Нет')
		return (
			<div className={$.shortInfoItem}>
				<img src={icon} className={iconClass}/>
				<span className={$.shortInfoItemTitle}>{title}</span>
				<span className={$.shortInfoItemCaption}>{txtCaption}</span>
			</div>
		)
	}

	const rulesHtml = {
		__html: condition.text.replace(/↵|\r\n|\r|\n/g, '<br/>')
	}

	const rulesWrapperClass = t959 ? $.t959RulesWrapper : $.rulesWrapper
	const shortInfoClass = t959 ? $.t959ShortInfo : $.shortInfo

	return (
		<div className={$.container}>
			<div className={$.title}>
				{l('Правила тарифа')}
			</div>
			<div className={$.content}>
				<div className={rulesWrapperClass}>
					<div dangerouslySetInnerHTML={rulesHtml}/>
				</div>
				<div className={shortInfoClass}>
					<div className={$.checkedBaggage}>
						<ShortInfoItem {...propsCheckedBaggage}/>
					</div>
					<div className={$.cabinBaggage}>
						<ShortInfoItem {...propsCabinBaggage}/>
					</div>
					<div className={$.changeRule}>
						<ShortInfoItem {...propsChangeRule}/>
					</div>
					<div className={$.refundRule}>
						<ShortInfoItem {...propsRefundRule}/>
					</div>
				</div>
			</div>
			<div className={$.footer}>
				<div className={$.closeBtn}>
					<CaButton {...propsCloseBtn}/>
				</div>
			</div>
		</div>
	)
}

export default enhancer(TariffRules)
