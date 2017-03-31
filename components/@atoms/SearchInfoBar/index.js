import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const SearchInfoBar = ({ $, ...props }) => {

	// Properties
	const {
		txtDepartureLocation,
		txtDestinationLocation,
		txtOutboundDate,
		txtInboundDate,
		txtConsist,
		onClick
	} = props

	return (
		<div className={$.container} onClick={() => onClick()}>
			<div className={$.firstLine}>
				{txtDepartureLocation} - {txtDestinationLocation}
			</div>
			<div className={$.secondLine}>
				{txtOutboundDate} - {txtInboundDate}
				<span className={$.consist}>{txtConsist}</span>
			</div>
		</div>
	)
}

export default enhancer(SearchInfoBar)
