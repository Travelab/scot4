import bootstrap from 'process-bootstrap'
import commander from 'commander'
import manifest from '../../package.json'

import dev from './dev/index_.js'
import create from './create'

// Some basic process setup
bootstrap('scot4', 'SCOT4')

commander
	.version(manifest.version)

commander
	.command('dev [componentsPaths...]')
	.description('Start development environment for a specific component')
	.action(dev)

commander
	.command('create [packageName]')
	.description('Generate some kind of package')
	.action(create)

commander.parse(process.argv)

// Execute default watch command
if (!commander.args.length) commander.help()