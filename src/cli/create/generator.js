import chalk from 'chalk'
import Base from 'yeoman-generator'
import { upperFirst, camelCase, kebabCase } from 'lodash'

import path, { cliBase, packagesPath } from '../../path'
const templatesPath = path.join(__dirname, 'templates')


const params = {
	duck: 'Ducks',
	style: 'Styles → $',
	args: 'Args',
	props: 'Props',
	lang: 'Lang → l()',
	isfwl: 'Staff For Watch Lifecycle',
	saga: 'Sagas',
}
const generalParamsChoices = [
	{ name: params.duck },
	{ name: params.style, checked: true },
	{ name: params.lang, checked: true },
	{ name: params.args },
	{ name: params.props },
]
const additionalParamsChoices = [
	{ name: params.saga, checked: true },
	{ name: params.isfwl },
]
const mapComponentProps = [
	{ f: 'style', t: '$' },
	{ f: 'lang', t: 'l' },
	{ f: 'duck', t: 'state, actions' },
	{ f: 'args', t: 'args' },
	{ f: 'props', t: 'props' },
]

function copy (src, dest) {
	this.fs.copyTpl(
		this.templatePath(src),
		this.destinationPath(dest|| src),
		this.context
	)
}

export default class extends Base {

	constructor(args, opts) {

		super(args, opts)

		this.argument('packageName', { type: String, required: false })

		this.sourceRoot(templatesPath)

		this.copy = copy.bind(this)
	}

	initializing () {

		const userName = this.user.git.name()

		this.log(chalk.green(`Hello ${chalk.yellow(userName)}! It's the package generator :-)`))

		this.author = `${userName} <${this.user.git.email()}>`
		this.foldersOfComponents = this.config.get('components')
	}

	prompting () {

		const prompts = [
			{
				type: 'input',
				name: 'name',
				message: `How do you want to name the ${chalk.yellow('component')}?`,
				default: this.options.packageName,
				validate: (input) => (input !== ''),
				filter: (name) => upperFirst(camelCase(name))
			},
			{
				type: 'list',
				name: 'folder',
				message: ({ name }) => (`In which folder do you want to put the ${chalk.yellow(name)} component?`),
				choices: this.foldersOfComponents
			},
			{
				type: 'checkbox',
				name: 'generalParams',
				message: ({ name, folder }) => {
					const p = chalk.yellow(path.join(folder, name))
					return `What do you want to include to the ${p} component?`
				},
				choices: generalParamsChoices
			},
			{
				type: 'checkbox',
				name: 'additionalParams',
				message: ({ name, folder }) => `Quack! Quack! What else?`,
				choices: additionalParamsChoices,
				when: ({ generalParams }) => (!!~generalParams.indexOf('Ducks'))
			},
			{
				type: 'confirm',
				name: 'doInject',
				message: ({ name, folder }) => {
					const p = chalk.yellow(`${folder}/${name}`)
					return `Do you want to inject ${p} component into ${chalk.magenta('Storybull')}?`
				}
			}
		]

		return this
			.prompt(prompts)
			.then((answers) => { this.answers = answers })
	}

	configuring () {

		const { name, folder, generalParams, additionalParams } = this.answers
		const finalParams = generalParams.concat(additionalParams || [])
		const componentPath = path.join(folder, name)

		const context = {
			componentPath,
			componentName: name,
			componentNameCamel: camelCase(name),
			componentNameKebab: kebabCase(name),
			componentType: folder,
			componentDescription: `${name} component created as part of ${upperFirst(folder)}`,
			author: this.author,
		}

		for (var param in params) context[param] = !!~finalParams.indexOf(params[param])

		context.componentProps = mapComponentProps
			.filter((p) => (context[p.f]))
			.map((p) => (p.t))
			.join(', ')

		this.context = context
	}

	writing () {

		const { componentPath, style, duck, saga } = this.context

		// Чтобы копировать всё в папку с новым компонентом
		this.destinationRoot(path.join(packagesPath, componentPath))

		this.copy('package.json')
		this.copy('index.jsx.js')
		this.copy('stories/index.js')

		style && this.copy('styles/index.js')
		duck && this.copy('ducks/index.js')
		saga && this.copy('sagas/index.js')
	}

	end () {

		// Чтобы искать .yo-rc.json в корне
		this.destinationRoot(cliBase)

		const { doInject } = this.answers
		const { componentPath } = this.context

		if (doInject) {

			var nextLoaded
			var prevLoaded = this.config.get('loaded')

			if (prevLoaded && Array.isArray(prevLoaded)) {

				if (!~prevLoaded.indexOf(componentPath)) {

					nextLoaded = [ ...prevLoaded, componentPath ]
				}
			} else {
				nextLoaded = [ componentPath ]
			}

			nextLoaded && this.config.set('loaded', nextLoaded)
		}

		this.log(chalk.green(`The ${chalk.yellow(componentPath)} component created! See you next time :-)`))
	}

}

