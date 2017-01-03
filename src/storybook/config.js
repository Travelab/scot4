import React from 'react'
import { whyDidYouUpdate } from 'why-did-you-update'
import { configure, addDecorator } from '@kadira/storybook'

// https://github.com/garbles/why-did-you-update
whyDidYouUpdate(React, {
	//include: /^pure/,
	exclude: /^Connect/
})

// В этой функции подключаются необходимые истории
// эту работу делает специальный лоадер, который берёт аргументы из консоли
function loadStories() {

	/* Place of required stories from CLI */
}

configure(loadStories, module)