import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

class Slider extends React.Component {

	constructor () {
		super()

		this._handleStart = this._handleStart.bind(this)
		this._handleMoving = this._handleMoving.bind(this)
		this._handleEnd = this._handleEnd.bind(this)
	}

	componentDidUpdate () {
		this._setNewPosition()
	}

	componentDidMount () {
		this._setNewPosition()
	}

	_getElemCoords (elem) {
		const rect = elem.getBoundingClientRect()

		return {
			top: rect.top + pageYOffset,
			left: rect.left + pageXOffset
		}
	}

	_handleMoving (e) {

		const { barNode } = this.refs
		const x = typeof e.pageX !== 'undefined' ? e.pageX : e.touches[0].pageX

		let newCoord = x - this.shiftX - this.barCoords.left
		if (newCoord < this.leftEdge) newCoord = this.leftEdge
		else if (newCoord > this.rightEdge) newCoord = this.rightEdge

		const { start, end, onFromChange, onToChange } = this.props
		const dimension = barNode.offsetWidth / (end - start)
		const newValue = (newCoord / dimension + start).toFixed(0)

		if (this.isFromHandleNode) onFromChange(newValue)
		else if (this.isToHandleNode) onToChange(newValue)
	}

	_handleEnd () {

		if (this.isFromHandleNode) this.props.onEndFrom()
		else if (this.isToHandleNode) this.props.onEndTo()

		document.removeEventListener('mousemove', this._handleMoving)
		document.removeEventListener('mouseup', this._handleEnd)

		document.removeEventListener('touchmove', this._handleMoving)
		document.removeEventListener('touchend', this._handleEnd)
	}

	_handleStart (e) {
		e.preventDefault()

		const barHandleCoords = this._getElemCoords(e.target)
		const x = typeof e.pageX !== 'undefined' ? e.pageX : e.touches[0].pageX

		this.shiftX = x - barHandleCoords.left - e.target.offsetWidth / 2
		const { barNode, fromHandleNode, toHandleNode } = this.refs
		this.isFromHandleNode = e.target === fromHandleNode
		this.isToHandleNode = e.target === toHandleNode

		this.barCoords = this._getElemCoords(barNode)
		this.leftEdge = this.isFromHandleNode
			? 0
			: fromHandleNode.offsetLeft + fromHandleNode.offsetWidth + toHandleNode.offsetWidth / 2
		this.rightEdge = this.isFromHandleNode
			? toHandleNode.offsetLeft - toHandleNode.offsetWidth / 2
			: barNode.offsetWidth

		document.addEventListener('mousemove', this._handleMoving)
		document.addEventListener('mouseup', this._handleEnd)

		document.addEventListener('touchmove', this._handleMoving)
		document.addEventListener('touchend', this._handleEnd)
}

	_setNewPosition () {
		const { barNode, fromHandleNode, toHandleNode, fillBarNode } = this.refs
		const { from, to, start, end } = this.props
		const barWidth = barNode.offsetWidth
		const dimension = barWidth / (end - start)
		// TODO handle case with from < start
		const fillBarLeft = (from - start) * dimension
		const fillBarRight = (end - to) * dimension
		const fromHandleWidth = fromHandleNode.offsetWidth
		const toHandleWidth = toHandleNode.offsetWidth
		const fromHandleLeft = fillBarLeft - fromHandleWidth / 2
		const toHandleRight = fillBarRight - toHandleWidth / 2

		fillBarNode.style.left = fillBarLeft + 'px'
		fillBarNode.style.right = fillBarRight + 'px'
		fromHandleNode.style.left = fromHandleLeft + 'px'
		toHandleNode.style.right = toHandleRight + 'px'
	}

	render() {
		// Properties
		const { $, txtFromValue, txtToValue } = this.props

		const renderTxtValue = () => (
			<div className={$.txtValues}>
				{txtFromValue} - {txtToValue}
			</div>
		)

		return (
			<div className={$.container}>
				{ txtFromValue && txtToValue && renderTxtValue() }
				<div className={$.bar} ref='barNode'>
					<div
						ref='fromHandleNode'
						className={$.fromHandle}
						onMouseDown={this._handleStart}
						onTouchStart={this._handleStart}
					/>
					<div
						ref='toHandleNode'
						className={$.toHandle}
						onMouseDown={this._handleStart}
						onTouchStart={this._handleStart}
					/>
					<div ref='fillBarNode' className={$.fillBar} />
				</div>
			</div>
		)
	}
}

export default enhancer(Slider)
