const LSKey = 'CONFY'

export default (confy) => {

	let saved = localStorage.getItem(LSKey)

	if (saved) {

		saved = JSON.parse(saved)

		let path, state
		for (path in saved) {
			state = saved[path]
			confy.switch(path, state)
		}

	} else {

		saved = {}
	}

	confy.on(({ path, state }) => {

		state = parseInt(state, 10)

		// 0 - умолчание для Switcher, а мы такое не храним (удаляем)
		if (state === 0) delete saved[path]
		else saved[path] = state

		localStorage.setItem(LSKey, JSON.stringify(saved))
	})
}