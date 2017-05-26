import chalk from 'chalk'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import { ifProd } from './utils'

export default () =>
  ifProd({
    plugins: [
      new ProgressBarPlugin({
        format: `${chalk.black.bgGreen('Build:')} [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
        clear: false
      })
    ]
  })
