var path =require("path")
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}
const alias = {

  src: resolveApp('src'),
  utils: resolveApp('src/utils'),

  actions: resolveApp('src/store/actions'),
  reducers: resolveApp('src/store/reducers'),
  sagas: resolveApp('src/store/sagas'),
  selectors: resolveApp('src/store/selectors'),

  components: resolveApp('src/components'),
  containers: resolveApp('src/containers'),

}

module.exports = alias
