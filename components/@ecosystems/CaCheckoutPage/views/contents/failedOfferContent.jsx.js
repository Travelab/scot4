import CaButton from '@atoms/CaButton'
import InfoMsg from '../infoMsg.jsx.js'

const FailedOfferContent = ({ meta, ...props }) => {

	const { $, l, f960 } = meta

	const txtTitle = l('Этот билет уже продан')
	const txtContent = l('Попробуйте найти альтернативный билет или измените даты вылета/прилёта.')

	const propsFindBtn = {
		title: l('Поискать альтернативный билет'),
		type: 'successForm',
		onClick: () => window.location.href = 'https://www.clickavia.ru/'
	}

	const findBtn = (
		<div className={$.failedContentFindBtnWrapper}>
			<CaButton {...propsFindBtn}/>
		</div>
	)

	const title = (
		<div className={$.failedContentTitle}>
			{txtTitle}
		</div>
	)
	const content = (
		<div className={$.failedContentContainer}>
			{txtContent}
		</div>
	)

	const propsInfoMsg = {
		title,
		content,
		footer: findBtn,
		t959: !f960
	}

	return <InfoMsg {...propsInfoMsg}/>
}

export default FailedOfferContent
