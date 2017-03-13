import { injectSheet, makeCX } from '@utils/taffy'
import React, { Component } from 'react'

import SVGbig from './big-svg-008.svg'
import SVGsb from './ic_subscriptions_24px.svg'
import style from './style'

@injectSheet(style(undefined, 40))
export default class extends Component {

	render () {

		const $ = this.props.sheet.classes
		const $x = makeCX($)

		return (
			<div>
				<div className={$x('not-good', 'practice')}>WOWOWO</div>
				<div className={$.heee}>He!!</div>
				<img src={SVGsb}/>
				<img src={SVGbig}/>
			</div>
		)
	}
}