import yo from '../../yo-yo'
import Generator from './generator.js'

export default (packageName) => {

	yo([
		{
			name: 'create',
			generator: Generator,
			args: [ packageName ]
		}
	])

}