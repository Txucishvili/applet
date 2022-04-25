import globalComponents from "@/schemes";
import { DynamicStore } from "@/services";
import { DynamicStoreState } from "@/services/indexStore";
import { DynamicContext } from "@/store";
import { createElement } from "react";

interface BlockListItem {
  completed: boolean;
  id: number;
  key: number;
  title: string;
  userId: number;
}

export interface BlockListModel {
  list: BlockListItem[];
  some: number;
  isLoading: boolean;
}

export interface BlockListDispatchs {
  type: 'SET_LOADER' | 'SET',
  payload: any;
}

const initState: BlockListModel = {
  list: [],
  some: 0,
  isLoading: false
}

//

export var BlockListContext = new DynamicStoreState<BlockListModel, BlockListDispatchs>('blocklist', initState, (state, { type, payload }) => {
  switch (type) {
    case 'SET':
      return { ...state, list: payload.list, isLoading: false };
      break;
    case 'SET_LOADER':
      return { ...state, isLoading: payload };
      break;
    default:
      return { ...state }
      break;
  }

});

BlockListContext.onReady = (status) => {
  console.log("BlockListContext OnReady", status);
}

export const NewContext = new DynamicContext({ count: 0 }, (state, payload) => {
  return Object.assign({ state }, { count: state.count + 1 });
});

