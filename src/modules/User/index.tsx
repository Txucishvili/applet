import { UserActionButtons } from "@/ui/components/BlockList/BlockList.user";
import ContentViewComponent from "./components/ContentView";
import SomeComponent from "./components/SomeComponent";
import UserComponent from "./components/UserComponent";

const withUser = (Component) => {
  return () => {
    return <Component message={"message user"} />
  }
};

const Components = {
  UserComponent: {
    component: UserComponent,
    id: "1"
  },
  ContentView: {
    component: ContentViewComponent,
    id: "1"
  },
  SharedComponent: {
    component: withUser(SomeComponent)
  },
  BlockList: {
    BlockItem: {
      ActionButtons: UserActionButtons
    }
  }
}

export default Components;