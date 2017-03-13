const checkIntl = (runApp) => {
	if (!window.Intl) {
		require.ensure([
			'intl',
			'intl/locale-data/jsonp/en.js',
			'intl/locale-data/jsonp/ru.js'
		], (require) => {
			require('intl')
			require('intl/locale-data/jsonp/en.js')
			require('intl/locale-data/jsonp/ru.js')
			runApp()
		})
	}
	else {
		runApp()
	}
}

export default checkIntl
