import { storiesOf, action } from '@kadira/storybook'

import MobileMenuBtn from '../index.js'

storiesOf('MobileMenuBtn', module)
	.add('default', () => (
		<div style={{background: '#b5b5b5', height: '60px', width: '160px'}}>
			<MobileMenuBtn
				onClick={action('menu clicked')}
			/>
		</div>
	))
