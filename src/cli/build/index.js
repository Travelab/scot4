import yo from '../../yo-yo'
import Generator from './generator.js'

export default () => {

	yo([
		{
			name: 'build',
			generator: Generator,
			//options: { packageName }
		}
	])

}