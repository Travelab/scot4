import { storiesOf } from '@kadira/storybook'

import BarLoader from '../index.js'

/*global module*/
/*eslint no-undef: "error"*/
storiesOf('BarLoader', module)
  .add('default', () => (
		<BarLoader />
  ))
