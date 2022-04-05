import Fetch from "@/API";
import globalComponents from "@/schemes";


class Modules {
  globalModules = {};

  async loadAppFor(key) {
    await import(
      /* webpackChunkName: [user-module] */
      `../schemes/${key}`
    ).then(m => {
      globalComponents[key] = m.modules;
      this.globalModules[key] = m.modules;
      console.log('[Module loaded for]', key, globalComponents)
    });
  }
}

const ModulesService = new Modules();

export default ModulesService;