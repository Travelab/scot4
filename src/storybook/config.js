import { configure, addDecorator } from '@kadira/storybook'


// В этой функции подключаются необходимые истории
// эту работу делает специальный лоадер, который берёт аргументы из консоли
function loadStories() {

	/* Place of required stories from CLI */
}

configure(loadStories, module)