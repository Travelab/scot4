import { createEnhancer } from '@utils/decoract'

import style from './styles/ticket-group.js'

const colors = [
	'#ff0000', // Red
	'#93a661', // Darker Kelly
	'#3c6478', // Lighter Indigo
	'#ebc944', // Daisy
	'#da621e', // Coral
]

export default createEnhancer({ style })(({ $, children, groupId }) => {

	const propsMark = {
		className: $.mark,
	}

	if (groupId > -1) {
		const markColor = colors[groupId]
		if (markColor) propsMark.style = { backgroundColor: markColor }
	}

	return (
		<div className={$.container}>
			<div className={$.group}>
				{children}
			</div>
			<div {...propsMark}></div>
		</div>
	)
})
