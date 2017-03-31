import { storiesOf, action } from '@kadira/storybook'

import CircleBtn from '../index.js'

storiesOf('CircleBtn', module)
	.add('default', () => (
		<div style={{width:'50px', height: '50px'}}>
			<CircleBtn
				text='На карте'
				fontSize={10}
				background='blue'
				color='white'
			/>
		</div>
	))
