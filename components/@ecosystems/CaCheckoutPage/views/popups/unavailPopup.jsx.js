import CaButton from '@atoms/CaButton'
import OverlayWrapper from '@molecules/OverlayWrapper'
import InfoMsg from '../infoMsg.jsx.js'

const UnavailPopUp = ({ meta, ...props }) => {

	const { $, l, f960 } = meta

	const txtTitle = l('К сожалению, этот билет больше недоступен')
	const txtContent = l('Авиакомпания не смогла подтвердить наличие мест по этому тарифу. Такое, увы, бывает и не зависит от нас. Мы можем предложить вам эти же рейсы по другому тарифу.')

	const onNewSearchClick = () => {
		window.location.href = 'https://www.clickavia.ru/'
	}

	const propsNewSearchBtn = {
		title: l('Выбрать новый вариант перелета'),
		type: 'green',
		onClick: onNewSearchClick
	}

	const content = (
		<div className={$.unavailContentContainer}>
			{txtContent}
		</div>
	)

	const newSearchBtn = (
		<div className={$.unavailNewSearchBtnWrapper}>
			<CaButton {...propsNewSearchBtn}/>
		</div>
	)

	const btnsClass = f960 ? $.unavailBtns : $.t959UnavailBtns
	const btns = <div className={btnsClass}>{buyBtn}</div>

	const propsInfoMsg = {
		title: txtTitle,
		content,
		footer: btns,
		t959: !f960
	}

	return (
		<OverlayWrapper>
			<div className={$.unavailContainer}>
				<InfoMsg {...propsInfoMsg}/>
			</div>
		</OverlayWrapper>
	)
}

export default UnavailPopUp
