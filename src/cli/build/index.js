import yo from '../../yo-yo'
import Generator from './generator.js'

export default (componentName, needTestServer) => {
	yo([
		{
			name: 'build',
			generator: Generator,
			options: { componentName, needTestServer }
		}
	])
}
