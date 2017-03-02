import Listr from 'listr'

const writePkg = require('write-pkg')
const knit = require('@knit/knit-core')
const needle = require('@knit/needle')

const createKnitTask = (m) => ({
  title: m,
  task: ctx => knit.findDependencies(m, needle.paths).then(used => {
    const pkg = ctx.pkgs[m]
    const pkgM = knit.updateModulePkg({
      internal: ctx.modules,
      used,
      updated: ctx.updated,
    }, {
      paths: needle.paths,
      rootPkg: needle.pkg,
      pkg,
      version: ctx.version
    })
    if (pkg.browser) {
      return knit.updateModulePkgBrowser(pkgM, needle.paths)
    }

    return pkgM
  }).then(pkg => (
    writePkg(
      knit.pathJoin(needle.paths.modules, m),
      pkg
    )
  ))
})

export default [
  {
    title: 'stitching together updated modules',
    task: ctx => new Listr(ctx.updated.map(createKnitTask), { concurrent: true })
  }
]