import { storiesOf, action } from '@kadira/storybook'

import leftArrow from '../leftArrow.svg'
import {tm} from '@utils/taffy'

storiesOf('BtnInStory', module)
	.add('with text', () => (
		<div>
			<button onClick={action('clicked')}>Hello</button>
			<button onClick={action('clicked')}>Привет!</button>
		</div>
	))
	.add('with some emoji', () => (
		<button onClick={action('clicked')}>😀 😎 👍 💯</button>
	))
