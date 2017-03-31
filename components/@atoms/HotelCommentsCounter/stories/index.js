import { storiesOf, action } from '@kadira/storybook'

import HotelCommentsCounter from '../index.js'

storiesOf('HotelCommentsCounter', module)
	.add('1 comment', () => (
		<HotelCommentsCounter commentsCount={1}/>
	))
	.add('2 comments', () => (
		<HotelCommentsCounter commentsCount={2}/>
	))
	.add('many comments', () => (
		<HotelCommentsCounter commentsCount={12}/>
	))
	.add('no comments', () => (
		<HotelCommentsCounter commentsCount={0}/>
	))
