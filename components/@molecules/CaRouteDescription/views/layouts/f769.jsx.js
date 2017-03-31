import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'

import style from '../../styles/f769.js'

const enhancer = createEnhancer({ style, withLang: false })

const F769 = ({ $, ...props }) => {
	const {
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
	} = props

	const Empty = () => null
	const Top = () => (
		<div className={$.top}>
			<div className={$.left}>
				<CaButton {...propsNewSearchBtn}/>
				<CaButton {...propsAllVariantsBtn}/>
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
	const TopPlacement = isSuccessMsg ? Empty : Top

	return (
		<div className={$.container}>
			<TopPlacement/>
			<div className={$.bottom}>
				<div className={$.route}>
					Ваши билеты по направлению {txtRoute}
					{isSuccessMsg ? l(' оформлены') : null}
				</div>
				<div className={$.details}>{txtOutboundDate}. {txtInboundDate}</div>
				<div className={$.details}>{txtConsist}, {txtCabinClass}</div>
			</div>
		</div>
	)
}

export default enhancer(F769)
