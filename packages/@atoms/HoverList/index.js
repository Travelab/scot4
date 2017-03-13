import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './style'

const itemHeight = 30
const maxItemsCount = 5
const enhancer = createEnhancer({
	style: style({ itemHeight, maxItemsCount }),
	withLang: false
})

class HoverList extends React.Component {

	componentDidUpdate () {
		this._revealActiveItem()
	}

	_revealActiveItem () {
		if (!this.activeItemNode || !this.containerNode) return

		const activeItemRect = this.activeItemNode.getBoundingClientRect()
		const containerRect = this.containerNode.getBoundingClientRect()

		if (activeItemRect.bottom > containerRect.bottom || activeItemRect.top < containerRect.top) {
			this.containerNode.scrollTop = this.activeItemNode.offsetTop + this.activeItemNode.clientHeight - this.containerNode.offsetHeight
		}
	}

	render () {
		const { $, items, fontSize, hoveredItemIdx, onItemHover, onItemClick } = this.props

		const cx = makeCX()

		const getItemClass = (idx) => (
			cx($.item, { [$.hoveredItem]: idx === hoveredItemIdx })
		)

		const itemStyle = { fontSize }

		const list = items.map((item, idx) => (
			<div
				style={itemStyle}
				key={idx}
				className={getItemClass(idx)}
				onMouseEnter={() => onItemHover(idx)}
				onClick={() => onItemClick(item)}
				ref={(node) => {if (idx === hoveredItemIdx) this.activeItemNode = node}}
			>
				{item}
			</div>
		))

		return (
			<div className={$.container} ref={(node) => this.containerNode = node}>
				{list}
			</div>
		)
	}
}

export default enhancer(HoverList)

