import { createContext, useContext, useReducer } from 'react';

interface ListContext {
  context: React.Context<any>;
  useContext: any;
  reducer: any;
  _reducer: any;
  Provider: any;
}

export function DynamicContext(this: ListContext, initValue, reducer?): void {
  this.context = createContext(initValue);
  this.useContext = () => useContext(this.context);
  this._reducer = () => { };
  this.reducer = (action, payload) => {
    return this._reducer(action, payload)
  };

  const Provider = this.context.Provider;

  this.Provider = ({ children }) => {
    const [state, dispatch]: any = useReducer(this.reducer, initValue);

    return <Provider value={[state, dispatch]}>
      {children}
    </Provider>
  };
}