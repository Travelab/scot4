import yeomanEnv from 'yeoman-environment'

import Generator from './generator.js'

const generatorName = 'scot4:create'

export default (packageName) => {

	const env = yeomanEnv.createEnv()

	env.registerStub(Generator, generatorName)

	const command = packageName
		? `${generatorName} ${packageName}`
		: generatorName

	env.run(command)

}