import path from 'path'

export const normalizePath = (component, packagesPath) => {
  let componentPath = component.toString().trim()

  // replace components path
  componentPath = componentPath.replace(`${path.basename(packagesPath)}${path.sep}`, '')

  // add @ to starts
  if (!componentPath.startsWith('@')) {
    componentPath = '@' + componentPath
  }

  // remove delimiter
  if (componentPath.endsWith(path.sep)) {
    componentPath = componentPath.slice(0, -1)
  }

  return path.normalize(componentPath)
}
