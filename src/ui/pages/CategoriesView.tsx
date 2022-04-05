import { BlockListContext } from "../components/BlockList/BlockListContext";
import BlockListRender from "../components/BlockList/BlockList";

const cloneArray = (index, array: any) => {
  const arr: any = [];
  for (let i = 0; i < index; i++) {
    arr.push(...array)
  }
  return arr.map((e, i) => {
    return {
      ...e,
      key: i
    }
  });
}


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
export default function CategoriesView() {
  
  return (
    <div>
      <BlockListContext.Provider>
        <BlockListRender onAction={() => {}} />
      </BlockListContext.Provider>
    </div>
  )
}