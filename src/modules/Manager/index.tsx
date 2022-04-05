import SomeComponent from "../User/components/SomeComponent";
import UserComponent from "../User/components/UserComponent";
import ContentViewComponent from "./components/ContentView";
import ManagerComponent from "./components/ManagerComponent";
import withMangerRule, { ManagerActionButtons } from "@/ui/components/BlockList/BlockList.manager";
import ReactRoutes from "@/routes/index";
import { useRoutes } from "react-router-dom";

const withAdminRules = (Component) => {
  

  return () => {
    return <Component message={"message manager"} />
  }
};

const Components = {
  UserComponent: {
    compoent: UserComponent,
    id: "1"
  },
  ManagerComponent: {
    component: ManagerComponent,
    id: "2"
  },
  ContentView: {
    component: ContentViewComponent,
    id: '3'
  },
  SharedComponent: {
    component: withAdminRules(SomeComponent)
  },
  BlockList: {
    wrapper: withMangerRule,
    BlockItem: {
        name: "manager",
        actionButtons: ManagerActionButtons,
    }
  }
}

const roles = ['manager'];

export default Components;