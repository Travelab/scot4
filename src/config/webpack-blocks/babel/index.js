export default function(options = {}) {
	let {
		test = /\.js$/,
		exclude,
		include,
		isProduction
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
            "targets": {
              "browsers": ["last 2 versions", "safari >= 7"]
            }
          }],
          require.resolve('babel-preset-react'),
          require.resolve('babel-preset-bluebird')
				],
				plugins: [
					require.resolve('babel-plugin-transform-object-rest-spread'),
					require.resolve('babel-plugin-transform-class-properties'),
					require.resolve('babel-plugin-react-require'),
					[require.resolve('babel-plugin-lodash'), {
						id: ['lodash', 'recompose']
					}],
					[require.resolve('babel-plugin-transform-runtime'), {
      			"helpers": false,
      			"polyfill": false,
      			"regenerator": true,
      			"moduleName": "babel-runtime"
    			}]
				]
			}
		}]
	}
}
