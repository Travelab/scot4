import { configure, addDecorator } from '@kadira/storybook'

import { baseCSSDecorator } from '@utils/taffy/storybull-decorators.js'
import confySwitcherDecorator from '@utils/confy/confy-switcher-decorator.js'

addDecorator(baseCSSDecorator)
addDecorator(confySwitcherDecorator)


// В этой функции подключаются необходимые истории
// эту работу делает специальный лоадер, который берёт аргументы из консоли
function loadStories() {

	/* Place of required stories from CLI */
}

configure(loadStories, module)