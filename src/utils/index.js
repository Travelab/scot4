import path from 'path'

const shared = {}

export function setShared (key, val) {

	shared[key] = val
}

export function getShared (key) {

	return shared[key]
}

export const normalizePath = (component, packagesPath) => {
  let componentPath = component.toString()

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
