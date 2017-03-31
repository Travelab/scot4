import { storiesOf, action } from '@kadira/storybook'

import Component from '../index.js'

import calendarIcon from './img/calendar.svg'
import adultIcon from './img/adult.svg'
import childrenIcon from './img/children.svg'
import babyIcon from './img/baby.svg'

const dateItem = [
	{
		icon: calendarIcon,
		text: '28 Сен, ср'
	}
]
const travelersItem = [
	{
		icon: adultIcon,
		text: '1'
	},
	{
		icon: childrenIcon,
		text: '2',
		iconHeightDiv: 2.4
	},
	{
		icon: babyIcon,
		text: '0',
		iconHeightDiv: 3
	}
]

storiesOf('IconicLabelField', module)
	.add('Date', () => (
		<div style={{background: 'lightblue', height: '60px', padding: '50px'}}>
			<Component
				items={dateItem}
				onClick={action('on field clicked')}
			/>
		</div>
	))
	.add('Travelers', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				items={travelersItem}
				onClick={action('on field clicked')}
			/>
		</div>
	))
	.add('Travelers activated', () => (
		<div style={{background: 'lightblue', height: '500px', padding: '50px'}}>
			<Component
				items={travelersItem}
				isActivated
				onClick={action('on field clicked')}
			/>
		</div> 
	))

