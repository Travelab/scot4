import { createEnhancer } from 'utils/decoract'
<% if (duck) { %>
import duck from './ducks/index.js'<% } %><% if (style) { %>
import style from './styles/index.js'<% } %>

const enhancer = createEnhancer({<% if (duck) { %>
	duck,<% } %><% if (style) { %>
	style,<% } %><% if (args) { %>
	args: {},<% } %><% if (!lang) { %>
	withLang: false,<% } %><% if (isfwl) { %>
	isfwl: true,<% } %>
})

const <%= componentName %> = ({ <%= componentProps %> }) => {
<% if (duck) { %>
	// Duck's state decomposition
	const {  } = state

	// Duck's actions decomposition
	const {  } = actions
<% } %><% if (args) { %>
	// Arguments
	const {  } = args
<% } %><% if (props) { %>
	// Properties
	const {  } = props
<% } %><% if (lang) { %>
	// UI-text
	const txtExample = l('Example')
<% } %>
	return (
		<div></div>
	)
}

export default enhancer(<%= componentName %>)