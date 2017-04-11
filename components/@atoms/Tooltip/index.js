import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { head } from 'lodash'

import TooltipTemplate from './TooltipTemplate.jsx.js'


const calculatePlacement = (offset) => {
	const height = document.body.offsetHeight
	const width = document.body.offsetWidth
	const vert = 0.5 * height - offset.top
	const vertPlacement = vert > 0 ? 'bottom' : 'top'
	const horiz = 0.5 * width - offset.left
	const horizPlacement = horiz > 0 ? 'right' : 'left'
	return Math.abs(horiz) > Math.abs(vert) ? horizPlacement : vertPlacement
}

// Calculates tooltip position depending on bounding box rect and placement
const getPositionByBoundingRect = ({ left, top, width, height }, placement) => {
	
	const absLeft = left + window.scrollX
	const absTop = top + window.scrollY

	switch (placement) {
		case 'top':
			return {
				left: absLeft + (width / 2),
				top: absTop
			}
		case 'left':
			return {
				absLeft,
				top: absTop + (height / 2)
			}
		case 'bottom':
			return {
				left: absLeft + (width / 2),
				top: absTop + height
			}
		case 'right':
			return {
				left: absLeft + width,
				top: absTop + (height / 2)
			}
	}
}


class Tooltip extends Component {

	state = {
		open: false
	}

	debounceMouseLeaveTimer = null

	componentDidMount () {
		this.tooltip = document.createElement('div')
		document.body.appendChild(this.tooltip)
		this._renderLayer()
	}

	componentWillUnmount () {
		ReactDOM.unmountComponentAtNode(this.tooltip)
		document.body.removeChild(this.tooltip)
	}

	_renderLayer () {
		let { placement, content } = this.props

		const rect = this.elementRef.getBoundingClientRect()

		if (!placement) {
			placement = calculatePlacement(rect)
		}

		const position = getPositionByBoundingRect(rect, placement)


		const props = {
			...position,
			content,
			placement,
			open: this.state.open,
			onMouseEnter: this.showTooltip.bind(this),
			onMouseLeave: this.handleMouseLeave.bind(this)
		}

		ReactDOM.render(
			<TooltipTemplate {...props}/>,
			this.tooltip
		)
	}


	handleMouseLeave = () => {
		this.debounceMouseLeaveTimer = setTimeout(this.hideTooltip.bind(this), 300)
	}

	hideTooltip = () => {
		this.setState({ open: false })
	}

	showTooltip = () => {
		if (this.debounceMouseLeaveTimer) clearTimeout(this.debounceMouseLeaveTimer)
		this.setState({ open: true })
	}

	toggleTooltip = () => {
		this.setState((prevS) => ({ open: !prevS.open }))
	}

	updateElementRef = (ref) => {
		this.elementRef = ref
	}

	componentDidUpdate () {
		this._renderLayer()
	}

	render () {
		const {
			props,
			updateElementRef,
			handleMouseLeave,
			hideTooltip,
			showTooltip,
			toggleTooltip,
			elementRef,
		} = this

		const { children } = props

		const wrapperProps = {
			onMouseEnter: showTooltip,
			onMouseLeave: handleMouseLeave,
			onTouchEnd: toggleTooltip,
			onBlur: hideTooltip,
			style: { outline: 'none' },
			tabIndex: 1,
		}

		// we need to set display style for wrapper same as it is on children
		if (elementRef) {
			wrapperProps.style.display = getComputedStyle(elementRef, null).getPropertyValue('display')
		}


		const getBody = () => {
			// if children is a react component we need to wrap it in a div
			if (typeof children.type !== 'string') {
				return (
					<div ref={updateElementRef} style={wrapperProps.style}>
						{children}
					</div>
				)
			} 

			return head(React.Children.map(children, (child) => 
				React.cloneElement(child, {
					ref: updateElementRef
				})
			))
		}

		return (
			<div {...wrapperProps}>
				{getBody()}
			</div>
		)
	}
}	


export default Tooltip
