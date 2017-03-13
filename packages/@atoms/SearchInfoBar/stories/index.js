import { storiesOf, action } from '@kadira/storybook'
import l from '@libs/lang'

import SearchInfoBar from '../index.js'

storiesOf('SearchInfoBar', module)
	.add('default', () => (
		<SearchInfoBar
			txtDepartureLocation={l('Москва')}
			txtDestinationLocation={l('Бали')}
			txtOutboundDate={l.date(new Date(2017, 1, 15))}
			txtInboundDate={l.date(new Date(2017, 2, 13))}
			txtConsist={l('2 взрослых')}
			onClick={action('on bar clicked')}
		/>
	))
