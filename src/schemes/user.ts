import withUserRule, { TodoItem, UserActionButtons } from "@/ui/components/BlockList/BlockList.user";

const Components = {
  BlockList: {
    wrapper: withUserRule,
    BlockItem: {
        name: "user",
        Item: TodoItem,
    }
  }
}

export const modules = {
  ...Components
}

export default Components;