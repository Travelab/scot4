import { createEnhancer } from '@utils/decoract'
import ProgressBar from 'react-progress-bar-plus'
import 'react-progress-bar-plus/lib/progress-bar.css'

import style from './styles'
import duck from './ducks'

const enhancer = createEnhancer({
	duck,
	style,
	withLang: false,
})

const FakeProgressBar = ({ $, state, actions, ...props }) => {

	// Properties
	const {  } = props
	// State
	const { percent } = state

	const barStyle = { width: `${percent}%` }

	return (
		<div className={$.container}>
			<div className={$.barWrapper}>
				<div className={$.bar} style={barStyle}/>
			</div>
		</div>
	)
}

export default enhancer(FakeProgressBar)
