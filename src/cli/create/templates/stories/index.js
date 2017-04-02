import { storiesOf } from '@kadira/storybook'<% if (duck) { %>
import { createReduxSagaDecorator } from '@libs/lash/create-redux-saga-decorator'<% } %>

import <%= componentName %> from '../index.js'<% if (duck) { %>
import duck from '../ducks/index.js'<% } %><% if (saga) { %>
import saga from '../sagas/index.js'<% } %>

storiesOf('<%= componentName %>', module)<% if (duck) { %>
	.addDecorator(createReduxSagaDecorator(duck<% if (saga) { %>, saga<% } %>))<% } %>
	.add('default', () => (
		<<%= componentName %>/>
	))