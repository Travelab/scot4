import { createEnhancer } from '@utils/decoract'
<% if (duck) { %>
import duck from './ducks/index.js'<% } %><% if (style) { %>
import style from './styles/index.js'<% } %><% if (cq) { %>

const cq = {
	f320t1024: {
		minWidth: 320,
		maxWidth: 1024,
	}
}<% } %>

const enhancer = createEnhancer({<% if (cq) { %>
	cq,<% } %><% if (duck) { %>
	duck,<% } %><% if (style) { %>
	style,<% } %><% if (args) { %>
	args: {},<% } %><% if (!pure) { %>
	pure: false,<% } %><% if (!lang) { %>
	withLang: false,<% } %>
})

const <%= componentName %> = ({ <%= componentProps %> }) => {
<% if (cq) { %>
	// Component Query decomposition
	const { f320t1024 } = cq
<% } %><% if (duck) { %>
	// Duck's state decomposition
	const {  } = state

	// Duck's actions decomposition
	const {  } = actions
<% } %><% if (duckling) { %>
	// Ditches decomposition
	const { SomeDitch } = ditch.getDitches()
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
		<div<% if (style) { %> className={$.container}<% } %>></div>
	)
}

export default enhancer(<%= componentName %>)