import { createEnhancer } from '@utils/decoract'
import { StickyContainer, Sticky } from '@libs/velcro'
import { makeCX } from '@utils/taffy'

import duck from './ducks/index.js'
import style from './styles/index.js'

const cq = {
	f320t1024: {
		minWidth: 320,
		maxWidth: 1024,
	}
}

const enhancer = createEnhancer({
	cq,
	duck,
	style,
})

const cx = makeCX()

const SerpTabulator = ({ $, cq, l, state, actions, ditch, ...props }) => {

	// Component Query decomposition
	const { f320t1024 } = cq

	// Duck's state decomposition
	const { activeTab } = state

	// Duck's actions decomposition
	const { setActiveTab } = actions

	// Props decomposition
	let { children } = props
	children = React.Children.toArray(children)

	function renderContent() {
		return (
			<div className={$.tabContent}>
				{children[activeTab]}
			</div>
		)
	}
	function renderList() {
		function applyLabels(child, i) {
			let itemClass = cx({
				[$.tabItem]: true,
				[$.activeTab]: i === activeTab ? true : false,
			})
			return (
				<li key={i} className={itemClass}>
					<a href="#" onClick={handleClick.bind(this, i)}>
						{child.props.label}
					</a>
				</li>
			)
		}
		return (
			<Sticky className={$.topSticky}>
				<ul className={$.tabList}>
					{children.map(applyLabels.bind(this))}
				</ul>
			</Sticky>
		)
	}
	function handleClick(i, event) {
		event.preventDefault()
		setActiveTab(i)
	}
	return (
		<StickyContainer>
			<div className={$.tabulator}>
				{renderList()}
				{renderContent()}
			</div>
		</StickyContainer>
	)
}

export default enhancer(SerpTabulator)