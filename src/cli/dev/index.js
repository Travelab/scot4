import yo from '../../yo-yo'
import Generator from './generator.js'

export default (componentName, doLinter) => {

	yo([
		{
			name: 'dev',
			generator: Generator,
			options: { componentName, doLinter }
		}
	])

}