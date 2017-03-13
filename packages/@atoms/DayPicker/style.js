const DAYPICKER_PADDING = 20
const CONTAINER_PADDING = DAYPICKER_PADDING / 1.33
const MONTH_MARGIN = DAYPICKER_PADDING - CONTAINER_PADDING
const NAVBUTTON_TOP = MONTH_MARGIN
const NAVBUTTON_HEIGHT = 24
const NAVBUTTON_WIDTH = 24
const NAVBUTTON_PREV_LEFT = DAYPICKER_PADDING
const NAVBUTTON_NEXT_RIGHT = DAYPICKER_PADDING

// const DAY_CELL_WIDTH = 30
const DAY_CELL_HEIGHT = 40
const DAY_CELL_PADDING = DAY_CELL_HEIGHT / 5.6
const DAY_CELL_LINE_HEIGHT = DAY_CELL_HEIGHT - DAY_CELL_PADDING * 2
const DAY_CELL_FONT_SIZE = DAY_CELL_LINE_HEIGHT / 1.5

export default {
	'@global': {
		'.DayPicker': {
			display: 'flex',
			flexFlow: 'row wrap',
			width: '100%',
			boxSizing: 'border-box',
			flexWrap: 'nowrap',
			display: 'inline-flex',
			justifyContent: 'center',
			position: 'relative',
			background: 'white',
			color: '#444',
			padding: CONTAINER_PADDING/2,
			userSelect: 'none',
			outline: 'none'
		},

		'.DayPicker-Month': {
			display: 'table',
			borderCollapse: 'collapse',
			borderSpacing: 0,
			margin: MONTH_MARGIN/2
		},

		'.DayPicker-NavBar': {
			position: 'absolute',
			left: 0,
			right: 0,
		},

		'.DayPicker-NavButton': {
			position: 'absolute',
			top: NAVBUTTON_TOP,
			width: NAVBUTTON_WIDTH,
			height: NAVBUTTON_HEIGHT,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: 'contain',
			cursor: 'pointer'
		},

		'.DayPicker-NavButton--prev': {
			left: NAVBUTTON_PREV_LEFT,
			backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5wcmV2PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9InByZXYiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzLjM5MzE5MywgMjUuMDAwMDAwKSBzY2FsZSgtMSwgMSkgdHJhbnNsYXRlKC0xMy4zOTMxOTMsIC0yNS4wMDAwMDApIHRyYW5zbGF0ZSgwLjg5MzE5MywgMC4wMDAwMDApIiBmaWxsPSIjNTY1QTVDIj4KICAgICAgICAgICAgPHBhdGggZD0iTTAsNDkuMTIzNzMzMSBMMCw0NS4zNjc0MzQ1IEwyMC4xMzE4NDU5LDI0LjcyMzA2MTIgTDAsNC4yMzEzODMxNCBMMCwwLjQ3NTA4NDQ1OSBMMjUsMjQuNzIzMDYxMiBMMCw0OS4xMjM3MzMxIEwwLDQ5LjEyMzczMzEgWiIgaWQ9InJpZ2h0IiBza2V0Y2g6dHlwZT0iTVNTaGFwZUdyb3VwIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K")'
		},

		'.DayPicker-NavButton--next': {
			right: NAVBUTTON_NEXT_RIGHT,
			backgroundImage: 'url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjI2cHgiIGhlaWdodD0iNTBweCIgdmlld0JveD0iMCAwIDI2IDUwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4zLjIgKDEyMDQzKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5uZXh0PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc2tldGNoOnR5cGU9Ik1TUGFnZSI+CiAgICAgICAgPGcgaWQ9Im5leHQiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuOTUxNDUxLCAwLjAwMDAwMCkiIGZpbGw9IiM1NjVBNUMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMCw0OS4xMjM3MzMxIEwwLDQ1LjM2NzQzNDUgTDIwLjEzMTg0NTksMjQuNzIzMDYxMiBMMCw0LjIzMTM4MzE0IEwwLDAuNDc1MDg0NDU5IEwyNSwyNC43MjMwNjEyIEwwLDQ5LjEyMzczMzEgTDAsNDkuMTIzNzMzMSBaIiBpZD0icmlnaHQiIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=")'
		},

		'.DayPicker-Caption': {
			display: 'table-caption',
			textAlign: 'center',
			lineHeight: '24px'
		},

		'.DayPicker-Weekdays': {
			display: 'table-header-group'
		},

		'.DayPicker-WeekdaysRow': {
			display: 'table-row'
		},

		'.DayPicker-Weekday': {
			display: 'table-cell',
			padding: [15, 5, 5, 5],
			fontSize: 12,
			textAlign: 'center',
			color: '#999'
		},

		'.DayPicker-Body': {
			display: 'table-row-group'
		},

		'.DayPicker-Week': {
			display: 'table-row'
		},

		'.DayPicker-Day': {
			display: 'table-cell',
			outline: 'none',
			lineHeight: DAY_CELL_LINE_HEIGHT + 'px',
			fontSize: DAY_CELL_FONT_SIZE,
			padding: DAY_CELL_PADDING,
			border: {
				width: 1,
				style: 'solid',
				color: '#fff'
			},
			textAlign: 'center',
			cursor: 'pointer',
			verticalAlign: 'middle'
		},

		'.DayPicker-Day--outside': {
			cursor: 'initial'
		},

		'.DayPicker-Day--disabled': {
			color: '#ccc',
			cursor: 'initial'
		},

		'.DayPicker-Day:not(.DayPicker-Day--outside):not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):hover': {
			background: '#eaeaea'
		},

		'.DayPicker-Day--selected:not(.DayPicker-Day--outside)': {
			background: '#ff7e00',
			color: '#fff'
		},

		'.DayPicker-Day--from:not(.DayPicker-Day--outside)': {
			background: '#cc6600 !important',
			position: 'relative',
		},
		'.DayPicker-Day--from:not(.DayPicker-Day--outside)::after': {
			content: 'close-quote',
			position: 'absolute',
			top: 0,
			right: 0,
			borderTop: {
				width: DAY_CELL_HEIGHT / 2,
				style: 'solid',
				color: '#ff7e00'
			},
			borderBottom: {
				width: DAY_CELL_HEIGHT / 2 - 1,
				style: 'solid',
				color: '#ff7e00',
			},
			borderLeft: {
				width: DAY_CELL_PADDING,
				style: 'solid',
				color: '#cc6600'
			}
		},

		'.DayPicker-Day--to:not(.DayPicker-Day--outside)': {
			background: '#cc6600 !important',
			position: 'relative',
		},
		'.DayPicker-Day--to:not(.DayPicker-Day--outside)::before': {
			content: 'close-quote',
			position: 'absolute',
			top: 0,
			left: 0,
			borderTop: {
				width: DAY_CELL_HEIGHT / 2,
				style: 'solid',
				color: '#ff7e00'
			},
			borderBottom: {
				width: DAY_CELL_HEIGHT / 2 - 1,
				style: 'solid',
				color: '#ff7e00',
			},
			borderRight: {
				width: DAY_CELL_PADDING,
				style: 'solid',
				color: '#cc6600'
			}
		}

	}
}

