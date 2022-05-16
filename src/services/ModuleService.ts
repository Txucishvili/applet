import { DynamicStoreState } from "@/store";

enum UserRoles {
  "user" = 0,
  "manager" = 1,
}

const initialUserScheme: any = {
  activeType: null,
  module: null,
  instance: null,
  shared: null
};

export const globalComponents = { ...initialUserScheme };

const modulesInitialState = {
  activeModule: 0,
  currentType: 'index'
}

const modulesReducer = (state, action) => {
  const { type, payload } = action;
  return { ...state, ...payload }
};

export const ModulesStore = new DynamicStoreState("ModulesStore", modulesInitialState, modulesReducer);

ModulesStore.onReady = (state) => {
}

class Modules {

  globalModules: any = {};

  async initModule(userObj) {
    const scheme =  UserRoles[userObj.roles];

    const module = await this._loadModules(scheme);
    const sharedModule = await this._loadModules('shared');

    Object.assign(globalComponents, {
      activeType: scheme,
      module: module.components,
      instance: module.Initilizer,
      shared: sharedModule,
    });

    module.Initilizer.onInit();

    Object.assign(modulesInitialState, { activeModule: 1, currentType: scheme })
  }

  async switchModule(user) {
    const { scheme = user.type, widgets } = user;
    if (scheme == globalComponents.activeType) {
      return;
    }


    const module = await this._loadModules(scheme);
    const sharedModule = await this._loadModules('shared');

    if (!!globalComponents.instance) {
      globalComponents.instance.onDestroy();
    }

    Object.assign(globalComponents, {
      activeType: scheme,
      module: module.components,
      instance: module.Initilizer,
      shared: sharedModule,
    })

    module.Initilizer.onInit();
    this.setModule(scheme);
    console.log('[Module loaded for]',ModulesStore.isReady)
  }

  setModule(type) {
    ModulesStore.dispatch({
      payload: {
        currentType: type
      }
    })
  }

  deleteModule() {
    globalComponents.instance.onDestroy(() => {
      Object.assign(globalComponents, initialUserScheme);

      ModulesStore.dispatch({
        payload: {
          currentType: 'index'
        }
      })
    });
  }

  async _loadModules(scheme) {
    return import(
      /* webpackChunkName: "user-modular" */
      /* webpackMode: "lazy" */
      `../schemes/${scheme}.ts`
    ).then(async m => {
      return m;
    })
  }
}

const ModulesService = new Modules();

export default ModulesService;