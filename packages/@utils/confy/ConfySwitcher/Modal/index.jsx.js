import { createEnhancer } from '@utils/decoract'

import style from './styles.js'
import items from './items.js'

const enhancer = createEnhancer({
	style,
	pure: false,
	withLang: false,
	args: { items },
})

const Modal = ({ $, close, args: { items } }) => {

	const doReset = () => {items.resetToDefault()}

	return (
		<div className={$.overlay}>
			<div className={$.close} onClick={close}></div>
			<div className={$.popup}>
				<h2 className={$.header}>Confy Switcher</h2>
				<div className={$.content}>
					{items.getItems().map((item, index) => {

						return (
							<div key={index} className={$.item}>
								<div className={$.options}>
									<div className={$.label}>{item.label}</div>
									<div className={$.chooser}>
										<select value={item.current} onChange={item.onChange}>
											{item.options.map((label, id) => (
												<option key={id} value={id}>{label}</option>
											))}
										</select>
									</div>
								</div>
								<div className={$.value}>{JSON.stringify(item.value)}</div>
							</div>
						)
					})}
				</div>
				<div className={$.footer}>
					<button className={$.right} onClick={doReset}>
						Reset all to default
					</button>
				</div>
			</div>
		</div>
	)
}

export default enhancer(Modal)
