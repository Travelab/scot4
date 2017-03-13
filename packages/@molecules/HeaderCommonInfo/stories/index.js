import { storiesOf, action } from '@kadira/storybook'

import HeaderCommonInfo from '../index.js'

storiesOf('HeaderCommonInfo', module)
	.add('default', () => (
		<HeaderCommonInfo/>
	))