import { createEnhancer } from '@utils/decoract'

import duck from './ducks/index'
import style from './styles/index'

const enhancer = createEnhancer({ duck, style })

const Stopwatch = ({ l, $, state, actions }) => {

	// Duck's state decomposition
	const { running, time } = state

	// Duck's actions decomposition
	const { start, stop, reset } = actions

	// UI-text
	const txtStart = l('Возобновить')
	const txtStop = l('Остановить')
	const txtReset = l('Обнулить')
	const txtRestSec = l(`Прошло {time, plural,
		=0 {ноль секунд}
		one {{time} секунда}
		few {{time} секунды}
		many {{time} секунд}
	}`, {
		time
	})

	return (
		<div className={$.cmp}>
			<div className={running ? $.timeRunning : $.time}>{time}</div>
			{running && <div className={$.rest}>{txtRestSec}</div>}
			<div className={$.ctrlPanel}>
				{!running && <button onClick={start}>{txtStart}</button>}
				{running && <button onClick={stop}>{txtStop}</button>}
				{time > 0 && <button onClick={reset}>{txtReset}</button>}
			</div>
		</div>
	)
}

export default enhancer(Stopwatch)
