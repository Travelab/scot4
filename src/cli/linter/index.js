import yo from '../../yo-yo'
import Generator from './generator.js'

export default (componentName) => {
	yo([
		{
			name: 'linter',
			generator: Generator,
			options: { componentName }
		}
	])
}
