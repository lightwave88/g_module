const $path = require('path');

const $modules = new Map();

const dirname = __dirname;

const $g_moudle = {
  load(name, path) {
    debugger;
    let _path = path;

    if (!$path.isAbsolute(_path)) {
      _path = $path.resolve(dirname, path);
    }

    let m = require(_path);

    if (typeof m == 'function' && m.inject === true) {
      m = m(this);
    }
    $modules.set(name, m);
  },
  //--------------------------------------
  get(name) {
    return ($modules.has(name) ? $modules.get(name) : null);
  },
  //--------------------------------------
  has(name) {
    return $modules.has(name);
  },
  //--------------------------------------
  importList(list) {
    Object.keys(list).forEach(name => {
      this.load(name, list[name]);
    });
  },
  //--------------------------------------
  get path() {
    return dirname;
  }
};

module.exports = $g_moudle;

