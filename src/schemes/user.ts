import {appNavigation, NavigationService } from "@/services/NavigationService";
import { RouterService } from "@/services/RouterService";
import withUserRule, { TodoItem, UserActionButtons, UserBlockList } from "@/ui/components/BlockList/BlockList.user";
import { SharedIconList } from "@/ui/Icon";
import { createElement } from "react";
import { ModuleTarget } from ".";

const Components = {
  Header: {
  },
  SideNav: {
    Navigations: [
      {
        path: '/user',
        name: "user",
        icon: SharedIconList.menu,
        label: "User Content",
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

@ModuleTarget
export class Initilizers {
  type = 'user';

  constructor(props) {
    // NavigationService.init({
    //   list: appNavigation.list.concat(components.SideNav.Navigations)
    // });
    NavigationService.init({
      list: appNavigation.list.concat(Components.SideNav.Navigations)
    });

    RouterService.init([{
      path: '/user',
      element: createElement('div', )
    }]);

  }

  onInit() {
    console.log("[onInit]", this.type);
    NavigationService.setNavFor({
      list: appNavigation.list.concat(Components.SideNav.Navigations)
    });
    
    RouterService.set([{
      path: '/user',
      element: createElement('div', {children: 'user page'}, 'page')
    }]);
  }

  onDestroy() {
    // console.log("[onDestroy]", this.type);
    RouterService.reset()
    NavigationService.reset()
  }
}


export let Initilizer = new Initilizers({});

export const _Initilizer = () => {
  Initilizer = new Initilizers({})
  return Initilizer;
};
export default components;