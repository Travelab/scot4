import path from 'path'
import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import rimraf from 'rimraf'
import autocomplete from 'inquirer-autocomplete-prompt'
import webpack from 'webpack'

import loadConfig from '../../config/production'
import selectPort from './selectPort'
import startServer from './startServer'
import { buildPath, entryDirectPath, packagesPath } from '../../path'
import { Base } from '../../yo-yo'

import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'

export default class extends Base {

  constructor (args, opts) {
    super(args, opts)

    this.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete)
  }

  prompting () {

    const components = this.getConfig('components')
    const availableComponents = glob
      .sync(`+(${components.join('|')})/*/`, {cwd: packagesPath})
      .map((name) => name.slice(0, -1))

    const choicesComponents = availableComponents.map((component) => {

      const [folder, name] = component.split('/')

      return {
        name: `${name} ${chalk.gray(folder)}`,
        short: name,
        value: component
      }
    })

    const chooser = (answers, input) => {

      return Promise.resolve(
        input
          ? choicesComponents.filter((c) => ~c.name.indexOf(input))
          : choicesComponents
      )
    }

    const prompts = [
      {
        type: 'autocomplete',
        name: 'component',
        message: `Which ${chalk.yellow('component')} do you want to build?`,
        validate: (component) => (!!~availableComponents.indexOf(component)),
        source: chooser,
      },
      {
        type: 'confirm',
        name: 'needTestServer',
        message: 'Do you need to run server for manual testing?',
        store: true
      }
    ]

    return this
      .prompt(prompts)
      .then((answers) => {
        this.component = answers.component
        this.needTestServer = answers.needTestServer
      })
  }

  configuring () {

    const entryPointPath = entryDirectPath
    const bundleName = (ext) => (`[name].[chunkhash].${ext}`)
    const outputPath = buildPath
    const rootComponentPath = path.join(packagesPath, this.component, 'index.js')

    this.webpackConfig = loadConfig({
      entryPointPath,
      outputPath,
      bundleName,
      rootComponentPath
    })
  }

  end () {
    const dashboard = new Dashboard()
    const compiler = webpack(this.webpackConfig)
    compiler.apply(new DashboardPlugin(dashboard))

    const remove = Promise.promisify(rimraf)
    const build = Promise.promisify(compiler.run, {context: compiler})

    return remove(buildPath)
      .then(() => build())
      .then(() => {

        if (this.needTestServer) {

          return selectPort()
            .then((port) => startServer(null, port))
            .then((address) => open(address))
        }
      })
      .catch((err) => {
        this.log(chalk.red(err))
      })
  }
}