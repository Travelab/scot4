import { createEnhancer } from '@utils/decoract'

import style from './styles/index.js'

const enhancer = createEnhancer({
	style,
	withLang: false,
})

const Checkbox = ({ $, ...props }) => {

	// Properties
	const { items } = props

	return (
		<div className={$.container}>
			{
				items.map((item, i) => {
					const txtId = `item${i}`
					return (
						<div className={$.checkboxItem} key={i}>
							<input
								type='checkbox' id={txtId} checked={item.checked} disabled='disabled'
							/>
							<label onClick={() => item.onChange()} htmlFor={txtId}>{item.label}</label>
							{/*<div className={$.note}>{item.note}</div>*/}
						</div>
					)
				})
			}
		</div>
	)
}

export default enhancer(Checkbox)
