import ConfySwitcher from './ConfySwitcher/index.jsx.js'

const confySwitcherDecorator = (getStory) => {

	return (
		<ConfySwitcher>
			{getStory()}
		</ConfySwitcher>
	)
}

export default confySwitcherDecorator