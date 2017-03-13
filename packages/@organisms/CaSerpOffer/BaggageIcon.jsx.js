import { createEnhancer } from '@utils/decoract'
import style from './styles/BaggageIcon.js'
import bag from './images/icon-bag.svg'

const enhancer = createEnhancer({
	style,
})

const BaggageIcon = ({ $, weight }) => (
	<span className={$.container}>
		<img src={bag} />
		<b>{weight}</b>
	</span>
)


export default enhancer(BaggageIcon)
