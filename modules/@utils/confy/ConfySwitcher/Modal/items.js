import confy from '../../index.js'

class Items {

	constructor () {

		this.items = []
	}

	addItem (item) {

		// Это не внутри getItems, чтобы экономить ресурсы — не нужно пересоздавать
		item.onChange = this.createHandler(item.onSelect)

		this.items.push(item)
	}

	getItems () {

		// Актуализируем перед выдачей
		this.items.forEach((item) => {

			item.label = item.getLabel()
			item.value = item.getValue()
			item.options = item.getOptions()
			item.current = item.getCurrent()
		})

		return this.items
	}

	resetToDefault () {

		this.items.forEach((item) => item.doReset())
	}

	createHandler (onSelect) {

		return (e) => {
			onSelect(e.target.value)
		}
	}
}

const items = new Items
const switchers = confy.switchers

for (let path in switchers) {

	const lable = path
	const switcher = switchers[path]

	items.addItem({
		getLabel: () => (lable),
		getOptions: () => {

			const options = []
			const values = switcher.values

			switcher.options.forEach((option, index) => {

				let label = option.label
				if (typeof label === 'function') label = label()

				// Делаю метку на отсутствующие значения в конфигурации
				let pointer = option.pointer
				if (typeof pointer === 'function') pointer = pointer()
				if (index > 0 && !values[pointer]) label = `${label} [−]`

				options.push(label)
			})

			return options
		},
		getValue: () => switcher.getValue(),
		getCurrent: () => (switcher.state),
		onSelect: (id) => switcher.setState(id),
		doReset: () => switcher.setState(),
	})
}

export default items