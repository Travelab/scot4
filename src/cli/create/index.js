import yo from '../../yo-yo'
import Generator from './generator.js'

export default componentName => {
  yo([
    {
      name: 'create',
      generator: Generator,
      options: { componentName }
    }
  ])
}
