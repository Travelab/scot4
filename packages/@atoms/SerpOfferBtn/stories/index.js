import { storiesOf, action } from '@kadira/storybook'

import SerpOfferBtn from '../index.js'

const decorator = (getStory) => (
	<div style={{ padding: 5, backgroundColor: '#ccc' }}>
		{getStory()}
	</div>
)

storiesOf('SerpOfferBtn', module)
	.addDecorator(decorator)
	.add('default', () => (
		<SerpOfferBtn isActive={true}/>
	))
	.add('inactive', () => (
		<div style={{ backgroundColor: '#ccc' }}>
			<SerpOfferBtn isActive={false}/>
		</div>
	))

