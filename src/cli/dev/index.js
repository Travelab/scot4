import yo from '../../yo-yo'
import Generator from './generator.js'

export default (componentName, needLinter, needStory) => {
	yo([
		{
			name: 'dev',
			generator: Generator,
			options: { componentName, needLinter, needStory }
		}
	])
}
