const $path = require('path');

const $modules = new Map();;

const $g_moudle = {
  load(name, path) {
    debugger;
    let _path = $path.resolve(__dirname, path);

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
  
};

module.exports = $g_moudle;

const importList = {
  mime: './mime/index.js',
  // ejs: './ejs/index.js',
  config: './config.js',
  tools: './tools.js',
  Response: './response.js',
  Server: './server.js',
};

debugger;
$g_moudle.importList(importList);


