export function redirectTo3ds (document, res) {
	const meta = res.body.meta['3ds_request']
	const form = document.createElement('form')
	form.method = 'post'
	form.action = meta.url
	// form.target = '_blank'

	Object.keys(meta.form).forEach((key) => {
		const node = document.createElement('input')
		node.name = key
		node.value = meta.form[key]

		form.appendChild(node)
	})

	document.body.appendChild(form)
	form.style.display = 'none'
	form.submit()
	document.body.removeChild(form)
}
