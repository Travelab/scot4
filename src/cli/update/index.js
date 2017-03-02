import Listr from 'listr'

const errors = require('@knit/nice-errors')
const log = require('@knit/logger')
const tasks = require('@knit/common-tasks')

const stitch = require('./tasks/stitch')

export default function update(argv) {
	new Listr([
    ...tasks.modules,
    ...tasks.preflight.knit,
    ...tasks.packages,
    ...tasks.updated,
    ...stitch
  ], {
    renderer: log.getRenderer(argv),
    collapse: false,
  }).run(argv).catch(errors.catchErrors)
}