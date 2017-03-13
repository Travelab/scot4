import { createEnhancer } from '@utils/decoract'

import style from './styles/header.js'

export default createEnhancer({ style })(({ $, l, t414, meta, data }) => {

	const txtTime = l('Всего {time} в пути', { time: data.time })

	const renderF414Layout = () => (
		<div className={$.container}>
			<div className={$.info}>
				<div className={$.direction}>
					<h2>
						{data.direction}
						<span className={$.label} style={{ color: meta.directionColor }}>
							{data.label}
						</span>
					</h2>
				</div>
				<div className={$.time}>{txtTime}</div>
			</div>
		</div>
	)

	const renderT414Layout = () => (
		<div className={$.t414Container}>
			<div className={$.info}>
				<div className={$.direction}>
					<h2>
						{data.direction}
						<span className={$.label} style={{ color: meta.directionColor }}>
							{data.label}
						</span>
					</h2>
				</div>
			</div>
		</div>
	)

	return t414 ? renderT414Layout() : renderF414Layout()
})
