import path from 'path'
import {CSSPlugin, BabelPlugin, SVGPlugin, EnvPlugin, ImageBase64Plugin, UglifyJSPlugin } from 'fuse-box'
import { entryPath, packagesPath } from '../path'

export default function({outputPath, rootComponentPath}) {
	return {
		homeDir: entryPath,
		outFile: path.join(outputPath, 'bundle.min.js'),
		log: true,
		debug: true,
		cache: false,
		natives: {
			process: false
		},
		plugins: [
			EnvPlugin({NODE_ENV: 'production'}),
			SVGPlugin(),
			CSSPlugin(),
			ImageBase64Plugin(),
			BabelPlugin({
				test: /\.js$/,
				limit2project: false,
				config: {
					"sourceMaps": true,
					"presets": [
						'babel-preset-es2015',
						'babel-preset-react'
					],
					"plugins": [
						'babel-plugin-transform-node-env-inline',
						'babel-plugin-transform-object-rest-spread',
						'babel-plugin-transform-class-properties',
						'babel-plugin-react-require',
						['babel-plugin-lodash', {
							id: ['lodash', 'recompose']
						}],
						['babel-plugin-transform-runtime', {
      			  "helpers": false,
      			  "polyfill": false,
      			  "regenerator": true,
      			  "moduleName": "babel-runtime"
    			  }]
					]
				}
			}),
			UglifyJSPlugin({
				compress: {
					warnings: false,
					dead_code: true,
					drop_console: true
				}
			})
		],
		alias: {
			'root-component': rootComponentPath
		},
		modulesFolder: packagesPath
	}
}
