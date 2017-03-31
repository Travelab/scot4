/**
 * Created by menscrem on 29.03.17.
 */
export default function(options = {}) {
  let {
    test = /\.js$/,
    exclude,
    include,
    config
  } = options

  if (exclude && !Array.isArray(exclude)) exclude = [ exclude ]
  if (include && !Array.isArray(include)) include = [ include ]

  return {
    enforce: 'pre',
    test, include, exclude,
    use: [{
      loader: 'eslint-loader',
      options: {
        ...config,
        formatter: require('eslint-friendly-formatter')
      }
    }]
  }
}
