import { storiesOf, action } from '@kadira/storybook'

import abc from 'base64-inline-loader!../calendar.svg'
console.log(abc)

import BarLoader from '../index.js'

storiesOf('BarLoader', module)
	.add('default', () => (
		<BarLoader/>
	))
