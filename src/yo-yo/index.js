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
		return console.log(chalk.red('Generators should be Array type'))

	const env = yeoman.createEnv()
	env.registerStub(Pre, preName)
	env.registerStub(Post, postName)

	class Entry extends Base {
		initializing () {
			this.composeWith(preName)
			generators.forEach((gen) => {
        const { name, generator, options } = gen
        const namespace = gn(name)

        env.registerStub(generator, namespace)
        this.composeWith(namespace, options)
			})
			this.composeWith(postName)
		}
	}

  env.registerStub(Entry, baseName)
	env.run(baseName)
}

export {
	yo as default,
	Base
}