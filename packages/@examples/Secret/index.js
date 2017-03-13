import obc from '@libs/obc'
import { createEnhancer } from '@utils/decoract'

import duck from './ducks'
import style from './styles'

// Так лучше не делать, это для примера
// Лучше делать так — саб-компоненты выносить в общие по Атомик-методологии
import { Loading, ListOfCodes } from './sub-comp.jsx.js'

const enhancer = createEnhancer({
	duck,
	style,
	args: {
		getCodes: obc.getCurrent,
	},
	isfwl: true
})

// Такие утилыты должны храниться в отдельных папках, тут просто для скорости примера
const genPin = () => (('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4))

const Secret = ({ l, $, state, actions, args }) => {

	// 3rd-party libs
	const { getCodes } = args
	const codes = getCodes()

	// Duck's state decomposition
	const { isActive, pin, DBStatus: { inLoading, inCurrent } } = state

	// Duck's actions decomposition
	const { toggleShield, applyPin } = actions

	// UI-text
	const txtBtn = l('Создать новый код')
	const txtActivate = l('Активировать панель')
	const txtDeactivate = l('Деактивировать панель')
	const txtLoading = l('Загружаются новые коды...')

	// pushToggleShield — эта обёртка существует для того,
	// чтобы в toggleShield не попадал ClickEvent в качестве первого аргумента
	// а то смотришь в дебагер и не понимаешь что за объекты такие через Ридакс ходят :-)
	const pushToggleShield = () => toggleShield()
	const genAndApplyNewPin = () => { applyPin({ pin: genPin() }) }

	return (
		<div className={$.cmp}>

			<div className={isActive ? $.shieldDown : $.shieldRaised}>
				<div className={$.toggleShieldBtn} onClick={pushToggleShield}>
					{isActive ? txtDeactivate : txtActivate}
				</div>
			</div>

			<div className={$.pinControl}>
				{pin && <div className={$.pin}>{pin}</div>}
				<button onClick={genAndApplyNewPin}>{txtBtn}</button>
			</div>

			{inLoading && <Loading action={txtLoading} object={inLoading}/>}

			{inCurrent && <ListOfCodes items={codes} object={inCurrent}/>}

		</div>
	)
}

export default enhancer(Secret)