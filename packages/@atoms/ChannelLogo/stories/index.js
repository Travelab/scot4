import { storiesOf, action } from '@kadira/storybook'

import ChannelLogo from '../index.js'

storiesOf('CaLogo', module)
	.add('clickavia', () => (
		<ChannelLogo channel='clickavia'/>
	))
	.add('aviasales', () => (
		<ChannelLogo channel='aviasales'/>
	))