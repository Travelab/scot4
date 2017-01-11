import chalk from 'chalk'
import yeoman from 'yeoman-environment'

import Base from './base.js'
import Pre from './pre.js'
import Post from './post.js'

const gn = (name) => (`${baseName}:${name}`)

const baseName = 'scot4'
const preName = gn('pre')
const postName = gn('post')

const yo = (generators = []) => {

	if (!Array.isArray(generators))
		return console.log(chalk.red('generators should be Array type'))

	const env = yeoman.createEnv()

	generators = generators.map((gen) => {

		let { name, generator, args = [], opts = {} } = gen

		opts.arguments = args.filter((v) => (v)) // Remove undefined

		args = gn(name)

		env.registerStub(generator, args)

		return { name, generator, args, opts }
	})

	class Entry extends Base {
		initializing () {
			this.composeWith(preName)
			generators.forEach((gen) => {
				this.composeWith(gen.args, gen.opts)
			})
			this.composeWith(postName)
		}
	}

	env.registerStub(Entry, baseName)
	env.registerStub(Pre, preName)
	env.registerStub(Post, postName)

	env.run(baseName)
}

export {
	yo as default,
	Base
}