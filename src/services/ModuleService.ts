import { UserStore } from '@/services/UserService';
import { RouterService } from '@/store/routerContext';
import { appNavigation, NavigationService } from "@/store/NavigationService";
import { DynamicStore } from ".";
import { InitilizeWidget, WidgetsModule } from './WidgetService';

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

export const ModulesStore = new DynamicStore("ModulesStore", modulesInitialState, modulesReducer);

class Modules {

  globalModules: any = {};

  async initModule(userObj) {

    const scheme = userObj.type;

    const module = await this._loadModules(scheme);
    const sharedModule = await this._loadModules('shared');

    // InitilizeWidget(userObj);
    
    NavigationService.init({
      list: appNavigation.list.concat(module.components.SideNav.Navigations)
    });

    if (module.components.Routes) RouterService.init(module.components.Routes.routes)


    Object.assign(globalComponents, {
      activeType: scheme,
      module: module.components,
      instance: module.Initilizer,
      shared: sharedModule,
    });

    module.Initilizer.init();

    Object.assign(modulesInitialState, { activeModule: 1, currentType: scheme })
  }

  async switchModule(user) {
    const {scheme = user.type, widgets} = user;
    if (scheme == globalComponents.activeType) {
      return;
    }

    const module = await this._loadModules(scheme);
    const sharedModule = await this._loadModules('shared');

    if (!!globalComponents.instance) {
      globalComponents.instance.onDestroy();
    }

    // attach
    // if (WidgetsModule == null) {
    //   await InitilizeWidget(user);
    //   WidgetsModule.setWidgets(widgets);
    // } else {
    //   WidgetsModule.setWidgets(widgets);
    // }

    Object.assign(globalComponents, {
      activeType: scheme,
      module: module.components,
      instance: module.Initilizer,
      shared: sharedModule,
    })

    module.Initilizer.init();
    this.setModule(scheme);
    // console.log('[Module loaded for]',globalComponents)
  }

  setModule(type) {
    ModulesStore.dispatcher({
      payload: {
        currentType: type
      }
    })

    NavigationService.setNavFor({
      list: appNavigation.list.concat(globalComponents.module.SideNav.Navigations)
    });

    if (globalComponents.module.Routes) {
      RouterService.set(globalComponents.module.Routes.routes)
    } else {
      RouterService.reset()
    }

  }

  deleteModule() {
    Object.assign(globalComponents, initialUserScheme);

    NavigationService.setNavFor({
      list: appNavigation.list
    });

    RouterService.reset()
    // WidgetsModule.reset();

    ModulesStore.dispatcher({
      payload: {
        currentType: 'index'
      }
    })
  }

  async _loadModules(scheme) {
    return import(
      /* webpackChunkName: "user-modular" */
      `../schemes/${scheme}.ts`
    ).then(async m => {
      return m;
    })
  }
}

const ModulesService = new Modules();

export default ModulesService;