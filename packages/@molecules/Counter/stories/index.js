import { storiesOf, action } from '@kadira/storybook'

import Counter from '../index.js'

storiesOf('Counter', module)
	.add('default', () => (
		<div style={{width: 270}}>
			<Counter
				height={80}
				value={5}
				incrementIsDisabled={false}
				decrementIsDisabled={false}
			/>
		</div>
	))
