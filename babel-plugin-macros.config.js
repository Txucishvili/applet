module.exports = {
  importAll: {
    transformModulePath(modulePath, importingPath) {
      const projectRoot = path.join(__dirname, '../src')
      const modulePathWithoutExt = modulePath.replace(/\.js$/, '')
      const absolutePath = path.resolve(
        path.dirname(importingPath),
        modulePathWithoutExt,
      )
      const pathRelativeToRoot = path.relative(projectRoot, absolutePath)
      console.log('-----------------------------------------------------------')
      return pathRelativeToRoot
    },
  },
  'fontawesome-svg-core': {
    'license': 'free'
  }
}