import { storiesOf, action } from '@kadira/storybook'

import PciCompliance from '../index.js'

const decorator = (getStory) => (
	<div style={{ backgroundColor: '#dbe5e8', fontFamily: 'HelveticaNeue', width: '320px', padding: '10px' }}>
		{getStory()}
	</div>
)

storiesOf('PciCompliance', module)
	.addDecorator(decorator)
	.add('default', () => (
		<PciCompliance/>
	))
