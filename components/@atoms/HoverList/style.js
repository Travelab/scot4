export default function ({ itemHeight = 30, maxItemsCount = 5 } = {}) {

	const CONTAINER_MAX_HEIGHT = maxItemsCount * itemHeight
	const ITEM_PADDING = 5
	const ITEM_LINE_HEIGHT = itemHeight - ITEM_PADDING * 2
	const ITEM_FONT_SIZE = ITEM_LINE_HEIGHT / 1.25

	return {
		container: {
			minWidth: '100%',
			// background: 'white',
			maxHeight: CONTAINER_MAX_HEIGHT,
			overflow: 'auto',
			color: '#444'
		},

		item: {
			cursor: 'pointer',
			padding: ITEM_PADDING,
			lineHeight: ITEM_LINE_HEIGHT + 'px',
			fontSize: ITEM_FONT_SIZE,
			// borderBottom: {
				// width: 1,
				// style: 'solid',
				// color: 'transparent'
			// },

			// '&:last-child': {
				// borderBottom: 0
			// }
		},

		hoveredItem: {
			background: '#ff7e00',
			color: 'white'
		}
	}
}
