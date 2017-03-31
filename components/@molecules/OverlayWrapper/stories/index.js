import { storiesOf, action } from '@kadira/storybook'

import OverlayWrapper from '../index.js'

storiesOf('OverlayWrapper', module)
	.add('default', () => (
		<OverlayWrapper/>
	))