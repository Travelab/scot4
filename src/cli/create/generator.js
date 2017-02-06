import chalk from 'chalk'
import { Base } from '../../yo-yo'
import { upperFirst, camelCase, kebabCase } from 'lodash'

import path, { cliBase, packagesPath } from '../../path'
const templatesPath = path.join(__dirname, 'templates')


const params = {
	duck: 'Ducks',
	style: 'Styles → $',
	cq: 'Component Query',
	pure: 'Pure Component',
	args: 'Args',
	props: 'Props',
	lang: 'Lang → l()',
	isfwl: 'Staff For Watch Lifecycle',
	saga: 'Sagas',
	duckling: 'Ducklings',
}
const generalParamsChoices = [
	{ name: params.duck },
	{ name: params.style, checked: true },
	{ name: params.cq, checked: true },
	{ name: params.lang, checked: true },
	{ name: params.args },
	{ name: params.props },
	{ name: params.pure, checked: true },
]
const additionalParamsChoices = [
	{ name: params.duckling, checked: true },
	{ name: params.saga, checked: true },
	{ name: params.isfwl },
]
const mapComponentProps = [
	{ f: 'style', t: '$' },
	{ f: 'cq', t: 'cq' },
	{ f: 'lang', t: 'l' },
	{ f: 'duck', t: 'state, actions, ditch' },
	{ f: 'args', t: 'args' },
	{ f: 'props', t: '...props' },
]

export default class extends Base {

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
				choices: this.getConfig('components')
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
				when: ({ generalParams }) => (!!~generalParams.indexOf(params.duck))
			},
			{
				type: 'confirm',
				name: 'doInject',
				message: ({ name, folder }) => {
					const p = chalk.yellow(path.join(folder, name))
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
			componentPackageName: kebabCase(componentPath),
			componentDescription: `${name} component created as part of ${upperFirst(folder)}`,
			author: `${this.getConfig('username')} <${this.getConfig('email')}>`,
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
		// потому что copy() работает от дестРута
		this.destinationRoot(path.join(packagesPath, componentPath))
		this.sourceRoot(templatesPath)

		this.copy('package.json')
		this.copy('index.jsx.js')
		this.copy('stories/index.js')

		style && this.copy('styles/index.js')
		duck && this.copy('ducks/index.js')
		saga && this.copy('sagas/index.js')
	}

	end () {

		const { doInject } = this.answers
		const { componentPath } = this.context

		if (doInject) {

			var nextLoaded
			var prevLoaded = this.getConfig('loaded')

			if (Array.isArray(prevLoaded)) {

				if (!~prevLoaded.indexOf(componentPath)) {

					nextLoaded = [ ...prevLoaded, componentPath ]
				}
			} else {
				nextLoaded = [ componentPath ]
			}

			nextLoaded && this.setConfig('loaded', nextLoaded)
		}

		this.log(chalk.green(`The ${chalk.yellow(componentPath)} component created!`))
	}

}

