import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

class InputField extends React.Component {
	focused = false
	_onBlurWrapper = this._onBlurWrapper.bind(this)

	componentDidUpdate () {
		if (this.props.isFocused && !this.focused && this.refs.inputNode) {
			this.focused = true
			this.refs.inputNode.focus()
		}
	}

	_onBlurWrapper () {
		this.focused = false
		this.props.onBlur && this.props.onBlur()
	}

	render () {
		const {
			$,
			value,
			placeholder,
			type,
			readOnly,
			onClick,
			onChange,
			onKeyDown,
		} = this.props

		const propsInput = {
			value,
			placeholder,
			type,
			readOnly,
			ref: 'inputNode',
			onClick: () => onClick(),
			onChange: (e) => onChange(e.target.value),
			onKeyDown,
			onBlur: this._onBlurWrapper
		}

		return (
			<div className={$.container}>
				<input { ...propsInput }/>
			</div>
		)
	}
}

export default enhancer(InputField)
