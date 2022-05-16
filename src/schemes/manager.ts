import { createElement } from 'react';
import { ManagaerBlockList, ManagerActionButtons, TodoItem } from "@/ui/components/BlockList/BlockList.manager";
import ManagerDashboard from '@/modules/Manager/routes/ManagerDashboard';
import { appNavigation, NavigationService } from '@/services/NavigationService';
import { RouterService } from '@/services/RouterService';
import { ModuleTarget } from '.';
import { SharedIconList } from '@/ui/Icon';

export let Components = {
  Header: {
  },
  Routes: {
    routes: [{
      path: '/manager',
      element: createElement(ManagerDashboard)
    }]
  },
  SideNav: {
    Navigations: [
      {
        path: '/manager',
        name: "manager",
        icon: SharedIconList.layers,
        label: "Manager Content",
        sortIndex: 4
      },
      {
        path: '/manager2',
        name: "manager",
        icon: SharedIconList.layers2,
        label: "Manager Content",
        sortIndex: 5
      }
    ]
  },
  BlockList: {
    BlockList: ManagaerBlockList,
    // wrapper: withMangerRule,
    BlockItem: {
        Item: TodoItem,
        ActionButtons: ManagerActionButtons
      },
  }
}

export const components = Components;

interface Modular {
  type?: string;
  namedValue?: string | null;
}

@ModuleTarget
export class ManagarModule implements Modular {
  type = 'manager';

  constructor(props) {
    // console.log("ManagerModule Constructor", this)
    NavigationService.init({
      list: appNavigation.list.concat(Components.SideNav.Navigations)
    });
    if (!RouterService.isInitialized) {
      RouterService.init(Components.Routes.routes);
    }
  }

  onInit() {
    console.log("[onInit]", this.type);
    
    NavigationService.setNavFor({
      list: appNavigation.list.concat(Components.SideNav.Navigations)
    });
    RouterService.set(Components.Routes.routes);
  }

  onDestroy() {
    console.log("[onDestroy]", this.type);
    RouterService.reset()
    NavigationService.reset();
  }
}


export let Initilizer = new ManagarModule({});

// export const _Initilizer = () => {
//   Initilizer = new ManagarModule({})
//   return Initilizer;
// };


export default components;