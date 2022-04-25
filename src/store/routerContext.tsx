import { DynamicStore } from '@/services';
import Routes from "@/routes";
import { cloneDeep } from 'lodash';

const initialNavigation: any = {
  routes: cloneDeep(Routes)
};

export const RouterStore = new DynamicStore("navigation", initialNavigation, (state, action) => {

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

  constructor() {
  }

  init(initCfg) {
    initialNavigation.routes[0].children = [].concat(initialNavigation.routes[0].children, initCfg);
  }

  set(list) {
    const childRoutes = [].concat(initialNavigation.routes[0].children, list);
    const newRouter = cloneDeep(Routes);
    newRouter[0].children = childRoutes;
    RouterStore.dispatcher({
      type: "ADD_ROUTE",
      payload: newRouter
    })
  }

  reset() {
    const newRouter = cloneDeep(Routes);
    RouterStore.dispatcher({
      type: "RESET",
      payload: newRouter
    })
  }
}

export const RouterService: any = new RouterServices();

export default {};