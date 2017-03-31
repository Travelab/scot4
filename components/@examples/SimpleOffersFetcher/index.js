import { get } from 'lodash'
import obc from '@libs/obc'
import { compose, connectDuckWithLang, injectStyle, injectArgs } from '@utils/decoract'

import duck from './ducks'
import style from './styles'

// Так лучше не делать, это для примера
// Лучше делать так — саб-компоненты выносить в общие по Атомик-методологии
import { Loading, ListOfOffers } from './sub-comp.jsx.js'

const enhancer = compose(
	connectDuckWithLang(duck, { isfwl: true }),
	injectStyle(style),
	injectArgs({
		getOffers: obc.getCurrent,
	})
)

// example defaults
let filterAcc = {
	departDate: '2017-02-10',
	returnDate: '2017-02-17',
	srcLocation: 'locality:3064',
	dstLocation: 'locality:3189',
	consist: '1,1,0'
}

const SimpleOffersFetcher = ({ l, $, state, actions, args }) => {
	// 3rd-party libs
	const { getOffers } = args
	const offers = getOffers()

	// Duck's state decomposition
	const { isActive, filter, DBStatus: { inLoading, inCurrent } } = state

	// Duck's actions decomposition
	const { toggleShield, applyFilter, updateFilter } = actions

	// UI-text
	const txtSetFilter = l('Устновить фильтр')
	const txtActivate = l('Активировать панель')
	const txtDeactivate = l('Деактивировать панель')
	const txtLoading = l('Загружаются офферы...')
	const fields = ['srcLocation', 'dstLocation', 'departDate', 'returnDate', 'consist']

	// pushToggleShield — эта обёртка существует для того,
	// чтобы в toggleShield не попадал ClickEvent в качестве первого аргумента
	// а то смотришь в дебагер и не понимаешь что за объекты такие через Ридакс ходят :-)
	const pushToggleShield = () => toggleShield()
	const applyNewFilter = (event) => {
		event.preventDefault()
		applyFilter(filterAcc)
	}
	const updateField = (field) => {
		return (event) => {
			filterAcc = { ...filterAcc,  [field]: event.currentTarget.value }
		}
	}
	const getFieldValue = (field) => get(filterAcc, field)

	return (
		<div className={$.cmp}>

			<div className={isActive ? $.shieldDown : $.shieldRaised}>
				<div className={$.toggleShieldBtn} onClick={pushToggleShield}>
					{isActive ? txtDeactivate : txtActivate}
				</div>
			</div>

			<div className={$.filterForm}>
			  <form onSubmit={applyNewFilter}>
				{fields.map(field => (<label key={field}>{field}: <input type="text" value={getFieldValue(field)} onChange={updateField(field)} /></label>))}
				<input type="submit" value={txtSetFilter} />
			  </form>
			</div>

			{inLoading && !inCurrent && <Loading action={txtLoading} object={inLoading}/>}
			{inCurrent && <ListOfOffers items={offers} object={inCurrent}/>}
		</div>
	)
}

export default enhancer(SimpleOffersFetcher)
