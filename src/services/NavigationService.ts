import { SharedIconList } from '@/ui/Icon';
import { DynamicStoreState } from '../store/DynamicStore';

export const appNavigation: any = {
  list: [
    {
      path: '/',
      name: "main",
      icon: SharedIconList.columns,
      label: "Miin",
      sortIndex: 0
    },
    {
      path: '/category',
      name: "news",
      icon: SharedIconList.list,
      label: "News",
      sortIndex: 2
    },
    {
      path: '/interests',
      name: "interests",
      icon: SharedIconList.tag,
      label: "User Interests",
      sortIndex: 1
    },
    // {
    //   path: '/list',
    //   name: "pages",
    //   icon: SharedIconList.library,
    //   label: "pages",
    //   sortIndex: 2
    // },
    // {
    //   path: '/bookmark',
    //   name: "saved",
    //   icon: SharedIconList.bookmark,
    //   label: "saved",
    // sortIndex: 0
    // },
    // {
    //   path: '/widgets',
    //   name: "widgets",
    //   icon: SharedIconList.checkpoints,
    //   label: "widgets",
    //   sortIndex: 3
    // },
    {
      path: '/setting',
      name: "configuration",
      icon: SharedIconList.gear,
      label: "configuration",
      sortIndex: 4
    }
  ]
}

const initialNavigation: any = { list: [] };

const sortList = (a, b) => {

  if (a.sortIndex < b.sortIndex) {
    return -1;
  }
  if (a.sortIndex > b.sortIndex) {
    return 1;
  }

  return 0;
}

export const NavigationStore = new DynamicStoreState("navigation", initialNavigation, (state, action) => {
  switch (action.type) {
    case "SET_LIST":
      return { ...state, ...{ list: action.payload.list.sort(sortList) } }
      break;
    case "ADD_ITEM":
      const newList = state.list.concat(action.payload);
      return { ...state, ...{ list: newList } }
      break;
    case "UPDATE":
      // console.log("apdating")
      return { ...state, ...{ list: action.payload.list } }
      break;

    default:
      break;
  }
})

class NavigationServices {
  initialValue = { ...appNavigation };

  constructor() {
    this.init(appNavigation);
  }

  init(initCfg) {
    const list = initCfg.list.sort(sortList);
    Object.assign(initialNavigation, { list })
  }

  setNavFor(list) {
    // console.log("Setting navigation", initialNavigation)
    NavigationStore.dispatch({
      type: "UPDATE",
      payload: list
    })
  }


  reset() {
    this.setNavFor({
      list: appNavigation.list
    })
  }
}

export const NavigationService = new NavigationServices();

export default {};