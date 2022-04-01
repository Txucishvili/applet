import { Component, Context, createContext, useContext, useReducer } from "react";

const initState: any = {
  list: []
}

export const BlockListContext = createContext(initState);
export const useBlockList: any = () => useContext(BlockListContext);

function reducer(state, payload) {
  const returnState = state.list = payload;
  return Object.assign({ state }, { list: payload });
}

const BlockListProvider = (props: any) => {
  const [state, dispatch]: any = useReducer(reducer, initState)

  return <BlockListContext.Provider value={[state, dispatch]}>
    {props.children}
  </BlockListContext.Provider>
}

export default BlockListProvider;


//

interface ListContext {
  context: React.Context<any>;
  useContext: any;
  reducer: any;
  Provider: any;
}

export function ListContext(this: ListContext, initValue, reducer): void {
  console.log('initValue', initValue);
  this.context = createContext(initValue);
  this.useContext = () => useContext(this.context);
  this.reducer = reducer;

  const Provider = this.context.Provider;

  console.log("Provider", Provider)
  
  this.Provider = ({ children }) => {
    const [state, dispatch]: any = useReducer(this.reducer, initValue)

    return <Provider value={[state, dispatch]}>
      {children}
    </Provider>
  };
}
export const ListContextEl = new ListContext({list: []}, (state, payload) => {
  console.log("some reducer", payload);
  return Object.assign({state}, { list: payload });
});
export const NewContext = new ListContext({count: 0}, (state, payload) => {
  console.log("some reducer");
  return Object.assign({state}, { count: state.count + 1 });
});

