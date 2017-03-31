import { reduce } from 'lodash'
import { createEnhancer } from '@utils/decoract'

import style from './styles'

const enhancer = createEnhancer({
	style: style(),
})

const SerpOfferPrice = ({ l, $, ...props }) => {
	const { price, currency, consist, isActive, extView } = props

	let renderedConsist = null
	let priceClass = $.rightAlignedPrice
	if (consist) {
		const totalTravelers = reduce(consist, (sum, val) => sum + val, 0)
		const txtConsist = l(`за весь тур для {totalTravelers, plural,
			one {одного}
			few {{totalTravelers} человек}
			many {{totalTravelers} человек}
		}`, {
			totalTravelers
		})

		priceClass = $.price
		renderedConsist = <div className={$.consist}>{txtConsist}</div>
	}

	let containerClass = isActive ? $.activeContainer : $.container
	if (!extView) containerClass = $.conciseContainer

	return (
		<div className={containerClass}>
			<div className={priceClass}>{l.currency(price, currency)}</div>
			{renderedConsist}
		</div>
	)
}

export default enhancer(SerpOfferPrice)
