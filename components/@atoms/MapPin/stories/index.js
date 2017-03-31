import { storiesOf, action } from '@kadira/storybook'

import MapPin from '../index.js'

const containerStyle = {
	width: 500,
	height: 500,
	padding: '30px 0 30px 150px',
	backgroundColor: '#ccc'
}

const decorator = (getStory) => {

	return (
		<div style={containerStyle}>
			{getStory()}
		</div>
	)
}

storiesOf('MapPin', module)
	.addDecorator(decorator)
	.add('default', () => (
		<MapPin/>
	))
	.add('active', () => (
		<MapPin isActive={true}/>
	))
