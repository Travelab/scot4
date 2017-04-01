import chalk from 'chalk'
import coolTrim from 'cool-trim'
import { createServer } from 'spa-http-server'
import { buildPath } from '../../path'

export default function (host, port) {

	// Used with `app.listen` below
	const listenAddr = [ port ]

	if (host) {
		listenAddr.push(host)
	}

	const server = createServer({
		root: buildPath,
		pushState: true
	})

	return Promise.promisify(server.listen, { context: server })(...listenAddr)
		.then(() => {

			const address = `http://${host || '127.0.0.1'}:${port}/`

			console.log(coolTrim`
				${chalk.green('Test server started on:')}
				  ${chalk.yellow(address)}
			`)

			return Promise.resolve(address)
		})
}