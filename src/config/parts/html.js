import HtmlWebpackPlugin from 'html-webpack-plugin'

export default (
  {
    title = 'React Workbench',
    template = '',
  } = {}
) => {
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
