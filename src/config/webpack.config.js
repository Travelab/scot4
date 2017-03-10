import createSCPreset from './loader-presets/select-components'
import { entryStorybullPath } from '../path'

// Export a function. Accept the base config as the only param.
export default function (storybookBaseConfig, configType) {
	// configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	storybookBaseConfig.resolve = {
		...storybookBaseConfig.resolve,
		alias: {
			...storybookBaseConfig.resolve.alias,
			'entry-storybull': entryStorybullPath
		}
	}

	storybookBaseConfig.module.rules = [
		...storybookBaseConfig.module.rules,
		...createSCPreset(),
	]

	// Return the altered config
	return storybookBaseConfig
}