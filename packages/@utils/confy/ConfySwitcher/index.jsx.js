import Mousetrap from 'mousetrap'

import confy from '../index.js'
import Modal from './Modal/index.jsx.js'

// Shortcut for toggle vision of ConfySwitcher modal-window
const shortcut = [ 'q w', 'й ц' ]

class ConfySwitcher extends React.Component {

	constructor (props) {
		super(props)

		this.state = {
			isOpen: false,
			configVersion: confy.version,
		}

		this.toggleVision = this.toggleVision.bind(this)
		this.updateConfig = this.updateConfig.bind(this)
	}

	toggleVision () {
		this.setState((state) => ({ isOpen: !state.isOpen }))
	}

	updateConfig ({ version }) {
		this.setState({ configVersion: version })
	}

	componentDidMount () {
		confy.on(this.updateConfig)
		Mousetrap.bind(shortcut, this.toggleVision)
	}

	componentWillUnmount () {
		confy.off(this.updateConfig)
		Mousetrap.unbind(shortcut)
	}

	render () {

		let modal
		const { isOpen, configVersion } = this.state

		if (isOpen) {

			const modalProps = {
				close: this.toggleVision,
			}

			modal = <Modal {...modalProps}/>
		}

		return (
			<div>
				{modal}
				{React.cloneElement(this.props.children, { configVersion })}
			</div>
		)
	}
}

export default ConfySwitcher
