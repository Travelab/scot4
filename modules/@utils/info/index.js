import env from '@utils/env'

export default function () {
	env.isDev && console.log(...arguments)
}