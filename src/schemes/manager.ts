import withMangerRule, { ManagerActionButtons, TodoItem } from "@/ui/components/BlockList/BlockList.manager";

const Components = {
  BlockList: {
    wrapper: withMangerRule,
    BlockItem: {
        Item: TodoItem,
      },
  }
}

const roles = ['manager'];

export const modules = {
  ...Components
}

export default modules;