import { storiesOf, action } from '@kadira/storybook'

import Component from '../index.js'

storiesOf('HeaderNavigation', module)
	.add('default', () => (
		<div style={{ background: '#373a43' }}>
			<Component/>
		</div>
	))

