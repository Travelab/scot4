import yo from '../../yo-yo'
import Generator from './generator.js'

export default (componentsPaths) => {

	yo([
		{
			name: 'dev',
			generator: Generator,
			options: { componentsPaths }
		}
	])

}