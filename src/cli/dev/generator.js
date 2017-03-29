import fs from 'fs'
import path from 'path'
import glob from 'glob'
import open from 'open'
import webpack from 'webpack'
import {CLIEngine} from 'eslint'

import selectPort from './selectPort'
import startServer from './startServer'
import loadConfig from '../../config/dll'
import { dllPath, packagesPath } from '../../path'
import { setShared } from '../../utils'
import { Base } from '../../yo-yo'

const logger = console.log
export default class extends Base {

	constructor (args, opts) {
		super(args, opts)
	}

	prompting () {

		const components = this.getConfig('components')
		const availableComponents = glob
			.sync(`+(${components.join('|')})/*/`, { cwd: packagesPath })
			.map((name) => name.slice(0, -1))

		const normalizePath = (component) => {
			let componentPath = component.toString()

			// replace packages path
			componentPath = componentPath.replace(`${path.basename(packagesPath)}${path.sep}`, '')

      // remove delimiter
			if ( componentPath.endsWith(path.sep) ) {
        componentPath = componentPath.slice(0, -1)
      }

      // add @ to starts
      if ( !componentPath.startsWith('@') ) {
			  componentPath = '@' + componentPath
      }

			return componentPath
		}

		let { componentName } = this.options
    const component = normalizePath(componentName)
		if ( !availableComponents.includes(component) ) {
		  throw new Error(`Component ${componentName} not found in ${packagesPath}`)
		}
		this.component = component

		return selectPort().then((port) => this.port = port)
	}

	generating() {
		if (!fs.existsSync(dllPath)) {
			const compiler = webpack(loadConfig(dllPath))
			logger('=> Create dll manifest')
      return Promise.promisify(compiler.run, { context: compiler })()
	      .then(() => logger('=> Dll manifest created'))
		}
	}

	end () {

		/*const {doLinter} = this.answers

		if (doLinter) {
      const linter = new CLIEngine({
        configFile: require.resolve('eslint-config-tl3')
      })
      const lintFiles = this.components.map(component => path.join(packagesPath, component))
			const report = linter.executeOnFiles(lintFiles)
			if (report.errorCount > 0 || report.warningCount > 0) {
        const messageFormatter = linter.getFormatter()
        logger(messageFormatter(report.results))
        return;
			}
		}*/

		setShared('component', this.component)

		startServer(null, this.port)
			.then((address) => open(address))
	}
}