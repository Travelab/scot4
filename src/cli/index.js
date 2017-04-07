import bootstrap from 'process-bootstrap'
import commander from 'commander'
import manifest from '../../package.json'

import create from './create'
import dev from './dev'
import build from './build'
import buildCI from './buildCI'
import linter from './linter';
import update from './update';

// Some basic process setup
bootstrap('scot4', 'SCOT4')

commander
	.version(manifest.version)

commander
	.command('create [packageName]')
	.description('Generate some kind of package')
	.action(create)

commander
	.command('dev [componentName] [lint]')
	.description('Start development environment for a specific component')
  .action((componentName, linter) => {
		process.env.NODE_ENV = 'development'
	  dev(componentName, linter === 'lint' || linter === 'l')
	})

commander
	.command('build [componentName] [needTestServer]')
	.description('Build a specific environment')
	.action((componentName, needTestServer) => {
		process.env.NODE_ENV = 'production'
		build(componentName, needTestServer === 'server' || needTestServer === 's')
	})

commander
	.command('build-ci <componentName>')
	.description('Build a for ci environment')
	.action((componentName) => {
		process.env.NODE_ENV = 'production'
		buildCI(componentName)
	})

commander
	.command('lint [componentName]')
	.description('Build a specific environment')
	.action(linter)

commander
	.command('update')
	.description('Update dependencies for component\'s')
	.action(update)

commander.parse(process.argv)

// Execute default watch command
if (!commander.args.length) commander.help()