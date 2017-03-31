import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'

import style from '../../styles/f415t768.js'

const enhancer = createEnhancer({ style, withLang: false })

const F415t768 = ({ $, ...props }) => {
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
			<CaButton {...propsAllVariantsBtn}/>
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

export default enhancer(F415t768)
