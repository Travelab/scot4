import chalk from 'chalk'
import express from 'express'
import coolTrim from 'cool-trim'
import storybook from '@kadira/storybook/dist/server/middleware'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import createHtml from './createHtml'

const defaultDevMiddlewareConfig = {
  quite: true,
  noInfo: false,
  compress: true,
  clientLogLevel: 'none',
  historyApiFallback: true,
  watchOptions: {
    ignored: /node_modules/
  },
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
}

const defaultHotMiddlewareConfig = {
  log: () => {}
}

export default ({
  host,
  port,
  templatePath,
  webpackConfig,
  checkoutStorybook
}) => {
  const listenAddr = [port]

  if (host) {
    listenAddr.push(host)
  }

  const app = express()

  if (checkoutStorybook) {
    const storybookMiddleware = storybook({
      config: webpackConfig,
      webpackDevMiddlewareConfig: defaultDevMiddlewareConfig,
      webpackHotMiddlewareConfig: defaultHotMiddlewareConfig
    })

    app.use(storybookMiddleware)
  } else {
    const compiler = webpack(webpackConfig)
    const publicPath = webpackConfig.output.publicPath

    app.use(
      webpackDevMiddleware(compiler, {
        ...defaultDevMiddlewareConfig,
        publicPath
      })
    )
    app.use(webpackHotMiddleware(compiler, defaultHotMiddlewareConfig))
    app.get('*', (req, res) => {
      if (templatePath) {
        res.sendFile(templatePath)
      } else {
        res.send(createHtml(publicPath))
      }
    })
  }

  return Promise.promisify(app.listen, { context: app })(
    ...listenAddr
  ).then(() => {
    const address = `http://${host || 'localhost'}:${port}/`

    console.log(
      coolTrim`${chalk.green('React Storybook started on:')} ${chalk.yellow(address)}`
    )

    return Promise.resolve(address)
  })
}
