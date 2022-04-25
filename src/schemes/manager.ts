import { createElement } from 'react';
import { ManagaerBlockList, ManagerActionButtons, TodoItem } from "@/ui/components/BlockList/BlockList.manager";
import ManagerDashboard from '@/modules/Manager/routes/ManagerDashboard';
import { SharedIconList } from '@/store/NavigationService';

const Components = {
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

export class ManagarModule {
  type = 'manager';

  constructor(props) {
  }

  init() {
    // console.log("[onInit]", this.type)
  }

  onDestroy() {
    // console.log("[onDestroy]", this.type)
  }
}

export let Initilizer = new ManagarModule({});

// export const _Initilizer = () => {
//   Initilizer = new ManagarModule({})
//   return Initilizer;
// };


export default components;