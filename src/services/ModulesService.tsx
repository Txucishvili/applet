import Fetch from "@/API";
import globalComponents from "@/modules";

class Modules {
  globalModules = {};

  _loadModule(path, target) {
    return new Promise(async (r: any) => {
      await import(
        /* webpackChunkName: [user-module] */
        `../modules${path}`
      ).then(m => {
        globalComponents[target] = m.default;
        this.globalModules[target] = m.default;
        r();
        console.log(`[globalComponents] [${target}]`, this.globalModules)
      });
    })
  }

 async loadManagerModules() {
    await this._loadModule('/Manager/index', 'manager');
  }

  async loadUserModules() {
    await this._loadModule('/User/index', 'user');
  }
}

const ModulesService = new Modules();

export default ModulesService;