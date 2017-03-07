import createSCPreset from './loader-presets/select-components'
import {
 packagesPath,
 entryStorybullPath
} from '../path'

import css from '../webpack-blocks/css'
import svg from '../webpack-blocks/svg'
import image from '../webpack-blocks/image'

// Export a function. Accept the base config as the only param.
export default function (storybookBaseConfig, configType) {
	// configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	//console.log(storybookBaseConfig.entry.preview)
	//console.log(storybookBaseConfig.resolveLoader)


	storybookBaseConfig.resolve = {
		...storybookBaseConfig.resolve,
		modules: [
			...storybookBaseConfig.resolve.modules,
			'packages'
		],
		alias: {
			'entry-storybull': entryStorybullPath,
		}
	}

	storybookBaseConfig.module.rules = [
		...storybookBaseConfig.module.rules,
		...css({ include: packagesPath })().module.rules,
		...svg({ include: packagesPath })().module.rules,
		...image({ include: packagesPath })().module.rules,
		...createSCPreset(),
	]

	// Return the altered config
	return storybookBaseConfig
}
