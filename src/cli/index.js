import bootstrap from 'process-bootstrap'
import commander from 'commander'
import manifest from '../../package.json'

import dev from './dev'
import build from './build'
import create from './create'
import update from './update';

// Some basic process setup
bootstrap('scot4', 'SCOT4')

commander
	.version(manifest.version)

commander
	.command('dev [componentName] [lint]')
	.description('Start development environment for a specific component')
  .action((componentName, linter) =>
	  dev(componentName, linter === 'lint' || l === 'l')
  )

commander
	.command('update')
	.description('Update dependencies for component\'s')
	.action(update)

commander
	.command('create [packageName]')
	.description('Generate some kind of package')
	.action(create)

commander
	.command('build [componentName] [needTestServer]')
	.description('Build a specific environment')
	.action((componentName, needTestServer) =>
		build(componentName, needTestServer === 'server' || 's')
	)

commander.parse(process.argv)

// Execute default watch command
if (!commander.args.length) commander.help()