import path from 'path'
export default function(options = {}) {
	let {
		test = /\.js$/,
		exclude,
		include,
	} = options

	if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
	if (include && !Array.isArray(include)) include = [ include ]

	return {
		test, include, exclude,
		use: [{
			loader: 'babel-loader',
			query: {
				babelrc: false,
				cacheDirectory: true,
				presets: [
          [require.resolve('babel-preset-env'), {
            targets: {
              ie: 9,
              uglify: true,
            },
	          useBuiltIns: false,
	          modules: false
          }],
          require.resolve('babel-preset-react'),
          require.resolve('babel-preset-bluebird')
				],
				plugins: [
					require.resolve('babel-plugin-prejss'),
          require.resolve('babel-plugin-transform-class-properties'),
					[require.resolve('babel-plugin-transform-object-rest-spread'), {
				    useBuiltIns: true
					}],
					[require.resolve('babel-plugin-lodash'), {
						id: ['lodash', 'recompose']
					}],
          require.resolve('babel-plugin-react-require'),
					[require.resolve('babel-plugin-transform-runtime'), {
				    helpers: false,
						polyfill: false,
            regenerator: true,
						moduleName: path.dirname(require.resolve('babel-runtime/package'))
					}]
				]
			}
		}]
	}
}
