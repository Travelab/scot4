import chalk from 'chalk'
import express from 'express'
import coolTrim from 'cool-trim'
import storybook from '@kadira/storybook/dist/server/middleware'

// Build the webpack configuration using the `baseConfig`
// custom `.babelrc` file and `webpack.config.js` files
import { storybookPath } from '../../path'

export default function (host, port) {

	// Used with `app.listen` below
	const listenAddr = [port]

	if (host) {
		listenAddr.push(host)
	}

	const app = express()

	app.use(storybook(storybookPath))

	return Promise.promisify(app.listen, { context: app })(...listenAddr)
		.then(() => {

			const address = `http://${host || 'localhost'}:${port}/`

			console.log(coolTrim`
				${chalk.green('React Storybook started on:')}
				  ${chalk.yellow(address)}
			`)

			return Promise.resolve(address)
		})
}