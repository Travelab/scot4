import SVGPreset from './loader-presets/svg'
import createSCPreset from './loader-presets/select-components'

// Export a function. Accept the base config as the only param.
export default function (storybookBaseConfig, configType) {
	// configType has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	//console.log(storybookBaseConfig.entry.preview)
	//console.log(storybookBaseConfig.resolveLoader)

	storybookBaseConfig.resolve = {
		modulesDirectories: ['node_modules', 'packages']
	}

	let loaders = storybookBaseConfig.module.loaders

	loaders = [
		...loaders,
		...SVGPreset,
		...createSCPreset()
	]

	storybookBaseConfig.module.loaders = loaders

	// Return the altered config
	return storybookBaseConfig
}