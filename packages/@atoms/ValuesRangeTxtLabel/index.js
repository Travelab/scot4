import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './styles/index.js'

const cx = makeCX()
const enhancer = createEnhancer({
	style,
})

const ValuesRangeTxtLabel = ({ $, l, ...props }) => {

	// Properties
	const { title, maxValuesCount, values, isInRows } = props
	let txtRange = ''

	if (!maxValuesCount) {
		const txtFrom = l('от ')
		const txtTo = l(' до ')
		const txtInfinityTo = l(' и более')

		txtRange = txtFrom + values[0]

		if (values[1] === Infinity) {
			txtRange += txtInfinityTo
		}
		else {
			txtRange += (txtTo + values[1])
		}
	}
	else {
		if (!values.length) txtRange = 'Не выбран'
		else if (values.length === maxValuesCount) txtRange = 'Все'
		else txtRange = values.join(', ')
	}

	const containerClass = cx({
		[$.container]: true,
		[$.rowContainer]: isInRows
	})
	const titleClass = cx({
		[$.rowTitle]: isInRows
	})

	return (
		<div className={containerClass}>
			<div className={titleClass}>{title}</div>
			<div className={$.range}>{txtRange}</div>
		</div>
	)
}

export default enhancer(ValuesRangeTxtLabel)

