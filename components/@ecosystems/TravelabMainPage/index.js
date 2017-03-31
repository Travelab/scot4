import { StickyContainer } from '@libs/velcro'
import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import SearchBar from '../../@organisms/SearchBar'
import Header from '../Header'

import duck from './ducks/index.js'
import style from './styles/index.js'

import imgVisa from './images/visa.png'
import imgMcard from './images/mcard.png'

const cq = {
	t335: {
		maxWidth: 335
	},
	t700: {
		maxWidth: 700,
	},
	f700t998: {
		minWidth: 700,
		maxWidth: 998
	},
	f999: {
		minWidth: 999
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	style
})

const cx = makeCX()

const TravelabMainPage = ({ $, cq, l, state, actions, ditch }) => {

	// Component Query decomposition
	const { t335, t700, f700t998, f999 } = cq

	// UI-text
	const txtCreateTour = l('Создай и купи индивидуальный турпакет перелёт + отель + трансфер')
	const txtAviaNumber = l('800 авиакомпаний.')
	const txtHotelNumber = l('400 000 отелей')
	const txtFlightNumber = l('6 000 000 маршрутов.')
	const txtSlogan = l('Лаборатория путешествий')
	const txtTitleCreate = l('Создай')
	const txtTitlePay = l('Оплати')
	const txtTitleGet = l('Получи')
	const txtInstrCreate = l('Просто введи все данные в форму и выбери услуги, которые подходят тебе больше всего.')
	const txtInstrPay = l('Заполни все необходимые данные о путешественниках и произведи оплату.')
	const txtInstrGet = l('Все выписанные документы придут на электронную почту сразу после оплаты.')
	const txtMinsAndSecs = l('12 минут 32 секунды')
	const txtAverageTime = l('Среднее время покупки тура на travelab.com')
	const txtFooter = l('© TraveLab, 2015–2016. Мы принимаем:')

	const { searchBarDitch, headerDitch } = ditch.getDitches()
	const { searchBarOpened } = state
	const { openSearchBar, closeSearchBar, openSideMenu, closeSideMenu } = actions
	const propsSearchBar = {
		t999: !f999,
		isOpened: searchBarOpened,
		openSearchBar,
		closeSearchBar,
		ditch: searchBarDitch,
		isInlay: true
	}
	const headerState = headerDitch.getState(state)
	const isSideMenuOpened = headerState.isSideMenuOpened
	const propsHeader = {
		ditch: headerDitch
	}
	
	const headerWrapperClass = cx({
		[$.headerWrapper]: f999,
		[$.headerWrapperMobile]: !f999,
		[$.headerWrapperOpened]: !f999 && isSideMenuOpened,
	})
	// Components
	const header = () => (
		<div className={headerWrapperClass}>
			<Header {...propsHeader}/>
		</div>
	)
	const content = () => (
		<div className={$.content}>
			<div className={$.offer}>
				<p className={$.txtOffer}>{txtCreateTour}</p>
			</div>
			<div className={$.searchBox}>
					<SearchBar {...propsSearchBar}/>
			</div>
			<div className={t700 ? $.mediumInfoSlogan : $.infoSlogan}>
				<div className={t700 ? $.mediumInfo : $.info}>
					<ul className={$.infoList}>
						<li className={$.infoBullet}>{txtAviaNumber}</li>
						<li className={$.infoBullet}>{txtHotelNumber}</li>
						<li className={$.infoBullet}>{txtFlightNumber}</li>
					</ul>
				</div>
				<div className={t700 ? $.mediumInfo : $.info}>
					<p className={t700 ? $.mediumTxtSlogan : $.txtSlogan}>{txtSlogan}</p>
				</div>

			</div>
			<div className={t700 ? $.mediumInstructionsBox : $.instructionsBox}>
				<div className={t700 ? $.mediumInstructions : $.instructions}>
					<div className={t700 ? $.mediumInstructionsPoint : $.instructionsPoint}>
						<h3 className={$.instTitle}>{txtTitleCreate}</h3>
						<p className={$.instText}>{txtInstrCreate}</p>
					</div>
					<div className={t700 ? $.mediumInstructionsPoint : $.instructionsPoint}>
						<h3 className={$.instTitle}>{txtTitlePay}</h3>
						<p className={$.instText}>{txtInstrPay}</p>
					</div>
					<div className={t700 ? $.mediumInstructionsPoint : $.instructionsPoint}>
						<h3 className={$.instTitle}>{txtTitleGet}</h3>
						<p className={$.instText}>{txtInstrGet}</p>
					</div>
				</div>
				<div className={$.meanTime}>
					<div className={$.meanTimeContent}>
						<p className={$.time}>{txtMinsAndSecs}</p>
						<p className={$.timeText}>{txtAverageTime}</p>
					</div>
				</div>
			</div>
		</div>
	)
	const footer = () => (
		<div className={$.footer}>
			<div className={$.footerContent}>
				<p className={$.footerText}>{txtFooter}</p>
				<img src={imgVisa}/>
				<img src={imgMcard}/>
			</div>
		</div>
	)
	return (

			<div className={$.container}>
				<div className={$.wrapper}>
					<StickyContainer>
						{header()}
						{content()}
						{footer()}
					</StickyContainer>
				</div>
			</div>

	)
}

export default enhancer(TravelabMainPage)