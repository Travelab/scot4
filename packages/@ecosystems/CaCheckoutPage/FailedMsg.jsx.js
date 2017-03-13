import { createEnhancer } from '@utils/decoract'

import CaButton from '@atoms/CaButton'
import InfoMsg from './InfoMsg.jsx.js'

import style from './styles/failedMsg.js'

const enhancer = createEnhancer({
	style
})

const FailedMsg = ({ $, l, ...props }) => {

	const txtTitle = l('Этот билет уже продан')
	const txtContent = l('Попробуйте найти альтернативный билет или измените даты вылета/прилёта.')

	const propsFindBtn = {
		title: l('Поискать альтернативный билет'),
		type: 'successForm',
		onClick: () => window.location.href = 'https://www.clickavia.ru/'
	}

	const findBtn = (
		<div className={$.findBtnWrapper}>
			<CaButton { ...propsFindBtn } />
		</div>
	)

	const titleLoading = (
		<div className={$.titleLoading}>
			{txtTitle}
		</div>
	)
	const contentLoading = (
		<div className={$.contentLoading}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title: titleLoading,
		content: contentLoading,
		footer: findBtn,
	}

	return (
		<div>
			<InfoMsg { ...propsInfoMsg } />
		</div>
	)
}

export default enhancer(FailedMsg)
