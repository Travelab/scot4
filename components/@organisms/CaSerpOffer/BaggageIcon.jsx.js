import { createEnhancer } from '@utils/decoract'

import style from './styles/BaggageIcon.js'
import icoBag from './images/icon-bag.svg'

const enhancer = createEnhancer({
	style,
})

const BaggageIcon = ({ $, weight }) => (
	<span className={$.container}>
		<img src={icoBag}/>
		<b>{weight}</b>
	</span>
)


export default enhancer(BaggageIcon)
