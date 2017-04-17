import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (
  {
    title = 'React Workbench',
    template = '',
  } = {}
) => {
  if ( template ) {
    return {
      plugins: [
        new HtmlWebpackPlugin({
          title,
          inject: true,
          template: template,
        })
      ]
    }
  }

  return {}
}
