'use strict';

let $parent = null;

// for ES6
const $g_moudle = {

  modules: new Map(),
  //--------------------------------------
  // 可以有階層性
  get parent() {
    return $parent;
  },
  set parent(value) { },
  //--------------------------------------
  // API
  import(name, module = null) {
    // debugger;

    if (module == null && typeof (name) == 'string') {
      let modules = name;
      Object.keys(modules).forEach((moduleName) => {
        // debugger;
        const m = modules[moduleName];
        this.import(moduleName, m);
      });
      return;
    }
    //------------------
    // debugger;
    this.modules.set(name, module);
  },
  //--------------------------------------
  // API
  get(name, justSelf = false) {

    let res = null;

    let g = this;
    while (g != null) {
      if (g.modules.has(name, justSelf)) {
        res = g.modules.get(name);
        break;
      }
      if (justSelf) {
        break;
      }
      g = g.parent;
    }
    return res;
  },
  //--------------------------------------
  // API
  has(name, justSelf = false) {
    let g = this;

    while (g != null) {
      if (g.modules.has(name)) {
        return true;
      }
      if (justSelf) {
        return false;
      }
      g = g.parent;
    }
    return false;
  },
  //--------------------------------------
  setParent(p) {
    $parent = p;
  }
};

export default $g_moudle;
