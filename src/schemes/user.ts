import { SharedIconList } from "@/store/NavigationService";
import withUserRule, { TodoItem, UserActionButtons, UserBlockList } from "@/ui/components/BlockList/BlockList.user";

const Components = {
  Header: {
  },
  SideNav: {
    Navigations: [
      {
        path: '/user',
        name: "manager",
        icon: SharedIconList.menu,
        label: "Manager Content",
        sortIndex: 4
      }
    ]
  },
  BlockList: {
    wrapper: withUserRule,
    BlockList: UserBlockList,
    BlockItem: {
      name: "user",
      Item: TodoItem,
      ActionButtons: UserActionButtons
    }
  }
}

export const components = {
  ...Components
}
export class Initilizers {
  type = 'user';

  constructor(props) {
    // NavigationService.init({
    //   list: appNavigation.list.concat(components.SideNav.Navigations)
    // });
  }

  init() {
    // console.log("[onInit]", this.type)
  }

  onDestroy() {
    // console.log("[onDestroy]", this.type)
  }
}


export let Initilizer = new Initilizers({});

export const _Initilizer = () => {
  Initilizer = new Initilizers({})
  return Initilizer;
};
export default components;