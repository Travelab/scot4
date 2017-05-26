import chalk from 'chalk'
import yeoman from 'yeoman-environment'

import Base from './base.js'
import Pre from './pre.js'
import Post from './post.js'

const BASE_NAME = 'scot4'
const postfix = name => `${BASE_NAME}:${name}`
const PRE_NAME = postfix('pre')
const POST_NAME = postfix('post')

const yo = (generators = []) => {
  if (!Array.isArray(generators)) {
    const errorMessage = 'Generators should be Array type'
    throw new Error(chalk.red(errorMessage))
  }

  const env = yeoman.createEnv()
  env.registerStub(Pre, PRE_NAME)
  env.registerStub(Post, POST_NAME)

  class Entry extends Base {
    initializing () {
      this.composeWith(PRE_NAME)
      generators.forEach(gen => {
        const { name, generator, options } = gen
        const namespace = postfix(name)

        env.registerStub(generator, namespace)
        this.composeWith(namespace, options)
      })
      this.composeWith(POST_NAME)
    }
  }

  env.registerStub(Entry, BASE_NAME)
  env.run(BASE_NAME)
}

export { yo as default, Base }
