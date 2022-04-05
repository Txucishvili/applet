import globalComponents from "@/schemes";
import { DynamicContext } from "@/store";

const initState: any = {
  list: []
}
//

export var BlockListContext = new DynamicContext({ list: [] });

BlockListContext._reducer = (state, { type, payload }) => {
  switch (type) {
    case 'set':
      return { ...state, list: payload.list };
      break;
    default:
      return {...state}
      break;
  }

}

export const NewContext = new DynamicContext({ count: 0 }, (state, payload) => {
  return Object.assign({ state }, { count: state.count + 1 });
});

