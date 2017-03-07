import { storiesOf } from '@kadira/storybook'

import leftArrow from '../leftArrow.svg'
import {tm} from '@utils/taffy'

storiesOf('BtnInStory', module)
	.add('with text', () => (
		<div>
			<button>Hello</button>
			<button>Привет!</button>
		</div>
	))
	.add('with some emoji', () => (
		<button>😀 😎 👍 💯</button>
	))