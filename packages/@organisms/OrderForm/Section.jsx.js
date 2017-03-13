import { createEnhancer } from '@utils/decoract'
import { makeCX } from '@utils/taffy'

import style from './styles/section.js'

const cx = makeCX()

export default createEnhancer({ style })(({ $, l, t414, meta, data, children }) => {

	const titleClass = cx({
		[$.title]: true,
		[$.centeredTitle]: t414
	})

	const containerClass = cx({
		[$.container]: !t414,
		[$.t414Container]: t414
	})

	return (
		<div className={containerClass}>
			<div className={titleClass}>
				<h2 className={$.header}>{data.header}</h2>
				{data.caption && <div className={$.caption}>{data.caption}</div>}
			</div>
			<div className={$.content}>
				{children}
			</div>
		</div>
	)
})
