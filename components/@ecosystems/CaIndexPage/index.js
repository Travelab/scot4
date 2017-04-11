import { createEnhancer } from '@utils/decoract'

import CaHeader from '../../@organisms/CaHeader/index'
import SearchBar from '../../@organisms/SearchBar/index'

import duck from './ducks/index.js'
import style from './styles/index.js'

const cq = {
	t335: {
		maxWidth: 335,
	},
	f336t700: {
		minWidth: 336,
		maxWidth: 700,
	},
	f701t998: {
		minWidth: 701,
		maxWidth: 998,
	},
	f999: {
		minWidth: 999,
	}
}
const enhancer = createEnhancer({
	cq,
	duck,
	style,
})


const CaIndexPage = ({ $, cq, l, state, actions, ditch, ...props }) => {

	// Component Query decomposition
	const { t335, f336t700, f701t998, f999 } = cq
		
	// UI-text
	const txtAviaTickets = l(`Выгодные авиабилеты!`)
	const txtLowPrice = l(`Низкие цены для `)
	const txtClever = l(`умных`)
	const txtPassengers = l(`пассажиров.`)
	const txtWhy = l(`Почему у нас такие цены`)
	const txtHowItWorks = l(`и как это вообще работает`)
	const txtDirectFlights = l(`Прямые рейсы`)
	const txtCities = l(`в 145 городов`)
	const txtCountries = l(`и 38 стран`)
	const txtWhere = l(`Куда, на чем и с кем мы летаем?`)
	const txtCountriesAndDirects = l(`Страны и направления`)
	const txtAbout = l(`О компании`)

	// Ways-links array
	const cities = [
		{
			city: l(`Бангкок`),
			url: 'bangkok',
		},
		{
			city: l(`о. Пхукет`),
			url: 'phuket',
		},
		{
			city: l(`Гоа (Даболим)`),
			url: 'goa',
		},
		{
			city: l(`Барселона`),
			url: 'barcelona',
		},
		{
			city: l(`Дубай`),
			url: 'dubai',
		},
		{
			city: l(`Хургада`),
			url: 'hurgada',
		},
		{
			city: l(`Шарм-Эль-Шейх`),
			url: 'sharm_el_sheikh',
		},
		{
			city: l(`Париж`),
			url: 'paris',
		},
		{
			city: l(`Анталия`),
			url: 'antalya',
		},
		{
			city: l(`Стамбул`),
			url: 'istanbul',
		},
		{
			city: l(`Тенерифе`),
			url: 'tenerife',
		},
		{
			city: l(`Канкун`),
			url: 'cancun',
		},
		{
			city: l(`Пунта Кана`),
			url: 'punta_cana',
		},
		{
			city: l(`Аликанте`),
			url: 'alicante',
		},
		{
			city: l(`Бургас`),
			url: 'burgas',
		},
		{
			city: l(`Тиват`),
			url: 'tivat',
		},

	]
	
	//About Links
	const aboutLinks = [
		{
			caption: l(`Контакты`),
			href: 'contacts',
		},
		{
			caption: l(`История компании`),
			href: 'history',
		},
		{
			caption: l(`Часто задаваемые вопрос`),
			href: 'faq',
		},
		{
			caption: l(`О компании`),
			href: 'about',
		},
		{
			caption: l(`Пользовательское соглашение`),
			href: 'terms-of-use',
		},
	]

	const domain = `http://www.clickavia.ru/`
	const { searchBar } = ditch.getDitches()
	const { searchBarOpened } = state
	const { openSearchBar, closeSearchBar } = actions
	const propsSearchBar = {
		t999: !f999,
		isOpened: searchBarOpened,
		openSearchBar,
		closeSearchBar,
		ditch: searchBar,
		isInlay: true,
	}
	
	//Render Functions
	const renderContent = () => (
			<div className={$.contentWrapper}>
				<div className={!f336t700 ? $.promoBox : $.mediumPromoBox}>
					<div className={!f336t700 ? $.promoDivHow : $.mediumPromoDivHow}>
					<div className={$.airlineTickets}>
						<p>{txtAviaTickets}</p>
						<p>{txtLowPrice}<span className={$.italic}>{txtClever}</span> {txtPassengers}</p>
					</div>
					<div className={!f336t700 ? $.howItWorks : $.mediumHowItWorks}>
						<p className={$.price}>{txtWhy}</p>
						<p className={$.priceHow}>{txtHowItWorks}</p>
					</div>
					</div>
					<div className={!f336t700 ? $.promoDivDirects : $.mediumPromoDivDirects}>
					<div className={!f336t700 ? $.directFlights : $.mediumDirectFlights}>
						<p className={$.bold}>{txtDirectFlights}</p>
						<p>{txtCities}</p>
						<p>{txtCountries}</p>
					</div>
					<div className={$.whereWeFly}>
						<p>{txtWhere}</p>
					</div>
					</div>
				</div>
				<div className={$.searchBox}>
					<SearchBar {...propsSearchBar}/>
				</div>
			</div>
	)

	const renderWays = () => (
		<div className={t335 ? $.smallFirst : $.first}>
			<h4>{txtCountriesAndDirects}</h4>
			<ul>
				{cities.map((item, index) => (
					<li key={index}><a href={`${domain}way/${item.url}`}>{item.city}</a></li>
				))}
			</ul>
		</div>		
	)
	
	const renderAbout = () => (
		<div className={t335 ? $.smallSecond : $.second}>
			<h4><a href={`${domain}about`}>{txtAbout}</a></h4>
			<ul>
				{aboutLinks.map((item, index) => (
					<li key={index}><a href={`${domain}${item.href}`}>{item.caption}</a></li>
				))}
			</ul>
		</div>
	)

	const renderFooter = () => (
		<footer className={f999 ? $.mainFooter : $.mediumMainFooter}>
			<div className={$.footerWrapper}>
				{renderWays()}
				{renderAbout()}	
			</div>
			<div className={$.footerCopyright}>
				<p>© 2008–2016 ООО «Тревел Лаб»</p>&nbsp;
				<a href="tel:+74953747238">+7 (495) 646-22-66</a>&nbsp;
				<a href="mailto:info@clickavia.ru">info@clickavia.ru</a>
			</div>
		</footer>
	)
	
	return (
		<div className={$.container}>
			<CaHeader/>
			<div className={$.wrapper}>
				{renderContent()}
				{renderFooter()}
			</div>
		</div>
	)
}

export default enhancer(CaIndexPage)