import BaseCSS from './BaseCSS/index.jsx.js'

const baseCSSDecorator = (getStory) => {

	return (
		<BaseCSS>
			{getStory()}
		</BaseCSS>
	)
}

const createWrapperDecorator = (backgroundColor, maxWidth) => (getStory) => {

	const parent = {
		padding: '30px 20px',
		backgroundColor: '#e3e3e3',
		display: 'flex',
		justifyContent: 'center',
	}

	if (backgroundColor) parent.backgroundColor = backgroundColor

	const child = {
		width: '100%',
		maxWidth,
	}

	return (
		<div style={parent}>
			<div style={child}>{getStory()}</div>
		</div>
	)
}

export {
	baseCSSDecorator,
	createWrapperDecorator,
}