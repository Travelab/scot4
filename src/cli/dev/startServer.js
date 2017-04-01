import chalk from 'chalk'
import express from 'express'
import coolTrim from 'cool-trim'
import storybook from '@kadira/storybook/dist/server/middleware'

import { storybookPath } from '../../path'

export default function (host, port) {

	const listenAddr = [ port ]

	if (host) {
		listenAddr.push(host)
	}

	const app = express()

	const storybookMiddleware = storybook({
		configDir: storybookPath,
		webpackDevMiddlewareConfig: {
			noInfo: false,
			quite: true,
			stats: {
        // Add asset Information
        assets: false,
        // Add information about cached (not built) modules
        cached: true,
        // Show cached assets (setting this to `false` only shows emitted files)
        cachedAssets: true,
        // Add children information
        children: false,
        // Add chunk information (setting this to `false` allows for a less verbose output)
        chunks: true,
        // Add built modules information to chunk information
        chunkModules: false,
        // Add the origins of chunks and chunk merging info
        chunkOrigins: false,
        // `webpack --colors` equivalent
        colors: true,
        // Display the distance from the entry point for each module
        depth: false,
        // Display the entry points with the corresponding bundles
        entrypoints: false,
        // Add errors
        errors: false,
        // Add details to errors (like resolving log)
        errorDetails: false,
        // Exclude modules which match one of the given strings or regular expressions
        exclude: [/node_modules/],
        // Add the hash of the compilation
        hash: true,
        // Add built modules information
        modules: false,
        // Show performance hint when file size exceeds `performance.maxAssetSize`
        performance: false,
        // Show the exports of the modules
        providedExports: false,
        // Add public path information
        publicPath: true,
        // Add information about the reasons why modules are included
        reasons: false,
        // Add the source code of modules
        source: false,
        // Add timing information
        timings: true,
        // Show which exports of a module are used
        usedExports: false,
        // Add webpack version information
        version: true,
        // Add warnings
        warnings: false
			}
		},
		webpackHotMiddlewareConfig: {
		  log: () => {}
		}
	})

	app.use(storybookMiddleware)

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