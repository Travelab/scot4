import glob from 'glob'
import chalk from 'chalk'
import rimraf from 'rimraf'
import autocomplete from 'inquirer-autocomplete-prompt'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { addPlugins, createConfig, entryPoint, setOutput, customConfig, webpack } from '@webpack-blocks/webpack2'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import babel from '@webpack-blocks/babel6'
import svg from '../../webpack-blocks/svg'

import path, { packagesPath, buildPath } from '../../path'
import { Base } from '../../yo-yo'


export default class extends Base {

	constructor (args, opts) {
		super(args, opts)

		this.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete)
	}

	prompting () {

		const components = this.getConfig('components')
		const availableComponents = glob
			.sync(`environment/*/`, { cwd: packagesPath })
			.map((name) => name.slice(0, -1))

		const choicesComponents = availableComponents.map((component) => {

			const [ folder, name ] = component.split('/')

			return {
				name: `${name} ${chalk.gray(folder)}`,
				short: name,
				value: name
			}
		})

		const chooser = (answers, input) => {

			return Promise.resolve(
				input
					? choicesComponents.filter((c) => ~c.name.indexOf(input))
					: choicesComponents
			)
		}

		/*let { componentsPaths } = this.options
		if (Array.isArray(componentsPaths)) {

			componentsPaths = componentsPaths
				.filter((c) => ~availableComponents.indexOf(c))

			if (componentsPaths.length) {
				const choosedComponents = componentsPaths.map((c) => chalk.yellow(c)).join(', ')
				this.log(`Components were choosed: ${choosedComponents}`)
				this.components = componentsPaths
			}
		}*/

		const prompts = [
			{
				type: 'autocomplete',
				name: 'component',
				message: `Which ${chalk.yellow('environment')} do you want to build?`,
				validate: (component) => (!!~availableComponents.indexOf(component)),
				source: chooser,
				when: () => (!this.components)
			}
		]

		return this
			.prompt(prompts)
			.then((answers) => { this.component = answers.component })
	}

	configuring () {

		const rootComponentPath = path.join(packagesPath, 'environment', this.component, 'index.jsx.js')
		const entryHtmlPath = path.join(__dirname, 'entry', 'index.html')
		const entryPointPath = path.join(__dirname, 'entry', 'index.js')
		const outputPath = path.join(buildPath, 'bundle.js')

		this.webpackConfig = createConfig([
			entryPoint(entryPointPath),
			setOutput(outputPath),
			addPlugins([
				new HtmlWebpackPlugin({
					inject: true,
					template: entryHtmlPath
				}),
				new webpack.LoaderOptionsPlugin({
					minimize: true,
					debug: false
				}),
				new webpack.DefinePlugin({
					'process.env': {
						'NODE_ENV': JSON.stringify('production')
					}
				}),
				new webpack.optimize.UglifyJsPlugin({
					beautify: false,
					mangle: {
						screw_ie8: true,
						keep_fnames: true
					},
					compress: {
						screw_ie8: true
					},
					comments: false
				})
			]),
			babel({
				"presets": [
					"es2015",
					"stage-0",
					"bluebird"
				],
				"plugins": [
					"transform-react-inline-elements",
					"transform-decorators-legacy",
					"transform-react-jsx",
					"add-module-exports",
					"react-require",
					["lodash", {
						"id": ["lodash", "recompose"]
					}],
					["transform-runtime", {
						"helpers": false,
						"polyfill": false,
						"regenerator": true,
						"moduleName": "babel-runtime"
					}]
				]
			}),
			svg({ include: packagesPath }),
			customConfig({
				resolve: {
					modules: [ 'node_modules', packagesPath ],
					alias: {
						'root-component': rootComponentPath
					}
				}
			})
		])
	}

	end () {

		const dashboard = new Dashboard()

		const compiler = webpack(this.webpackConfig)

		compiler.apply(new DashboardPlugin(dashboard.setData))

		const remove = Promise.promisify(rimraf)
		const build = Promise.promisify(compiler.run.bind(compiler))

		return remove(buildPath)
			.then(() => {
				return build().then(() => {
					this.log(chalk.green('Bundle successfully built!'))
				})
			})
			.catch((err) => {
				this.log(chalk.red(err))
			})
	}

}