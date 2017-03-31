import TransitionGroup from 'react-addons-css-transition-group'
import { createEnhancer } from '@utils/decoract'
import style from './styles/TooltipTemplate'


const enhancer = createEnhancer({
	style,
	withLang: false,
})

const transitionGroupProps = {
	transitionName: 'fade',
	component: 'div',
	transitionEnterTimeout: 250,
	transitionLeaveTimeout: 180,
}

const TooltipTemplate = ({ $, content, left, top, open, placement, ...props }) => (
	<TransitionGroup {...transitionGroupProps}>
		{open && <div style={{ left, top }} className={$[placement]} {...props}>
			<div>{content}</div>
		</div>}
	</TransitionGroup>	
)

export default enhancer(TooltipTemplate)
