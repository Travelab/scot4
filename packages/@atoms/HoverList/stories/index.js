import { storiesOf, action } from '@kadira/storybook'

import Component from '../index.js'

const suggestions = [ 'Тольятти', 'Самара', 'Чита', 'Томск' , 'Бали' ]

storiesOf('HoverList', module)
	.add('default', () => (
		<div style={{background: 'lightblue', height: '1000px', width: '160px', padding: '50px'}}>
			<Component
				items={suggestions}
				onItemHover={action('item hovered')}
				hoveredItemIdx={3}
			/>
		</div>
	))

