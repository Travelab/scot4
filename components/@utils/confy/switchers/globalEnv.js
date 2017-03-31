import { makeSwitcher } from '../utils.js'

const dev = 'dev'
const prod = 'prod'
const mock = 'mock'
const stage = 'stage'

const getDefaultEnvironment = () => {

	let env = process.env.NODE_ENV

	if (env) {

		env = env.toLowerCase()

		const aliasMap = {
			development: dev,
			production: prod,
			staging: stage,
			test: mock,
		}

		const alias = aliasMap[env]

		if (alias) env = alias

		if (env === dev || env === prod || env === mock || env === stage) return env
	}

	return dev
}

const defaultEnvironment = getDefaultEnvironment()

const globalEnv = makeSwitcher({
	options: [
		{
			label: `(NODE_ENV || Default) = ${defaultEnvironment}`,
			pointer: 'default'
		},
		{
			label: 'Production',
			pointer: prod
		},
		{
			label: 'Development',
			pointer: dev
		},
		{
			label: 'Staging',
			pointer: stage
		},
		{
			label: 'QA / Mock',
			pointer: mock
		},
	],
	values: {
		dev,
		prod,
		mock,
		stage,
		default: defaultEnvironment,
	}
})

export default globalEnv

export {
	dev,
	prod,
	mock,
	stage,
}
