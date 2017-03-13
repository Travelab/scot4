import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const cq = {
	f320t1024: {
		minWidth: 320,
		maxWidth: 1024,
	}
}

const enhancer = createEnhancer({
	cq,
	style,
})

const TravelabMainPage = ({ $, cq, l }) => {

	// Component Query decomposition
	const { f320t1024 } = cq

	// UI-text
	const txtExample = l('Example')
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

	// URL for images
	const imgVisa = 'https://travelab.com/public/ae6e5e701f02a0d76273f4d19bf09a7d.png'
	const imgMasCard = 'https://travelab.com/public/3e90b477b5c7e95bba47f8a3c4b006ac.png'

	// Components
	const header = () => (
		<div className={$.header}>
			<div className={$.placeholder}></div>
		</div>
	)
	const content = () => (
		<div className={$.content}>
			<div className={$.offer}>
				<p className={$.txtOffer}>{txtCreateTour}</p>
			</div>
			<div className={$.finder}>
				<div className={$.placeholder}></div>
			</div>
			<div className={$.infoSlogan}>
				<div className={$.info}>
					<ul className={$.infoList}>
						<li className={$.infoBullet}>{txtAviaNumber}</li>
						<li className={$.infoBullet}>{txtHotelNumber}</li>
						<li className={$.infoBullet}>{txtFlightNumber}</li>
					</ul>
				</div>
				<div className={$.slogan}>
					<p className={$.txtSlogan}>{txtSlogan}</p>
				</div>

			</div>
			<div className={$.instructionsBox}>
				<div className={$.instructions}>
					<div className={$.instructionsPoint}>
						<h3 className={$.instTitle}>{txtTitleCreate}</h3>
						<p className={$.instText}>{txtInstrCreate}</p>
					</div>
					<div className={$.instructionsPoint}>
						<h3 className={$.instTitle}>{txtTitlePay}</h3>
						<p className={$.instText}>{txtInstrPay}</p>
					</div>
					<div className={$.instructionsPoint}>
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
				<img src={imgMasCard}/>
			</div>
		</div>
	)
	return (
		<div className={$.backWrap}>
			<div className={$.container}>
				{header()}
				{content()}
				{footer()}
			</div>
		</div>
	)
}

export default enhancer(TravelabMainPage)