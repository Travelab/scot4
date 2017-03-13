import { createEnhancer } from '@utils/decoract'

import style from './styles/transfer.js'

export default createEnhancer({ style })(({ $, l, t414, ...props }) => {
	const { title, hint, duration } = props

	const txtDuration = l('{duration} между рейсами', { duration })

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.half}>
				<div className={$.caption}>Пересадка в г. {title}</div>
				{hint && <div className={$.caption}>{hint}</div>}
			</div>
			<div className={$.delay}>
				<div className={$.icon}></div>
				<div className={$.caption}>{txtDuration}</div>
			</div>
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.t414Container}>
			<div className={$.row}>
				<div className={$.changeCity}>{title}</div>
				{hint && <div className={$.changeAirport}>: {hint}</div>}
			</div>
			<div className={$.row}>
				<div className={$.t414DelayIcon}></div>
				<div className={$.caption}>{txtDuration}</div>
			</div>
		</div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
})
