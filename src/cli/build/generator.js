import glob from 'glob'
import open from 'open'
import chalk from 'chalk'
import rimraf from 'rimraf'
import autocomplete from 'inquirer-autocomplete-prompt'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { addPlugins, createConfig, entryPoint, setOutput, customConfig } from '@webpack-blocks/webpack2'
import webpack from 'webpack'
import Dashboard from 'webpack-dashboard'
import DashboardPlugin from 'webpack-dashboard/plugin'
import babel from '@webpack-blocks/babel6'
import extractText from '@webpack-blocks/extract-text2'
//import css from '../../webpack-blocks/css'
//import svg from '../../webpack-blocks/svg'
//import image from '../../webpack-blocks/image'

import selectPort from './selectPort'
import startServer from './startServer'

import path, { packagesPath, buildPath, entryHtmlPath, entryDirectPath } from '../../path'
import { Base } from '../../yo-yo'


export default class extends Base {

	constructor (args, opts) {
		super(args, opts)

		this.env.adapter.promptModule.registerPrompt('autocomplete', autocomplete)
	}

	prompting () {

		const components = this.getConfig('components')
		const availableComponents = glob
			.sync(`+(${components.join('|')})/*/`, { cwd: packagesPath })
			.map((name) => name.slice(0, -1))

		const choicesComponents = availableComponents.map((component) => {

			const [ folder, name ] = component.split('/')

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
		const bundleName = (ext) => (`[hash:18].bundle.${ext}`)
		const outputPath = path.join(buildPath, bundleName('js'))
		const rootComponentPath = path.join(packagesPath, this.component, 'index.jsx.js')

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
				presets: [ 'es2015', 'stage-0', 'bluebird' ],
				plugins: [
					'transform-react-inline-elements',
					'transform-decorators-legacy',
					'transform-react-jsx',
					'add-module-exports',
					'react-require',
					[
						'lodash',
						{
							id: [ 'lodash', 'recompose' ]
						}
					],
					[
						'transform-runtime',
						{
							helpers: false,
							polyfill: false,
							regenerator: true,
							moduleName: 'babel-runtime'
						}
					]
				]
			}),
			extractText(bundleName('css')),
			// TODO: replace to custom webpack config
			//svg({ include: packagesPath }),
			//image({ include: packagesPath }),
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
		const build = Promise.promisify(compiler.run, { context: compiler })

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