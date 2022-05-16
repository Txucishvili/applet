import Routes from "@/routes";
import { DynamicStoreState } from "@/store";
import { cloneDeep } from 'lodash';

const initialNavigation: any = {
  routes: cloneDeep(Routes)
};

export const RouterStore = new DynamicStoreState("navigation", initialNavigation, (state, action) => {

  switch (action.type) {
    case "ADD_ROUTE":
      return Object.assign({}, state, { routes: action.payload })
      break;
    case "RESET":
      return Object.assign({}, state, { routes: action.payload })
      break;
    case "ADD_ITEM":
      const newList = state.list.concat(action.payload);
      return { ...state, ...{ list: newList } }
      break;
    case "UPDATE":
      return { ...state, ...{ list: action.payload.list } }
      break;

    default:
      break;
  }
})

class RouterServices {
  isInitialized: boolean = false;

  constructor() {
  }

  init(initCfg) {
    this.isInitialized = true;
    initialNavigation.routes[0].children = [].concat(initialNavigation.routes[0].children, initCfg);
  }

  set(list) {
    const newRouter: any = cloneDeep(Routes);
    newRouter[0].children = [].concat(...newRouter[0].children, ...list);
    RouterStore.dispatch({
      type: "ADD_ROUTE",
      payload: newRouter
    })
  }

  reset() {
    const newRouter = cloneDeep(Routes);
    RouterStore.dispatch({
      type: "RESET",
      payload: newRouter
    })
  }
}

export const RouterService = new RouterServices();

export default {};