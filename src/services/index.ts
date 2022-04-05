import { DynamicContext } from "@/store";
import { DispatchWithoutAction, ReducerWithoutAction } from "react";
import { Context, createContext, createElement, Dispatch, ReducerStateWithoutAction, useContext, useEffect, useReducer } from "react";

export interface DynamicContext {
  name?: any;
  context?: any;
  useContext?: any;
  reducer?: any;
  _reducer?: any;
  Provider?: any;
  dispatcher?: any;
  useReducer?: any;
  isReady?: any;
  getName?: any;
}

const wrapWithProvider = (provider) => {
  return (props) => {
    const Provider = () => {
      return createElement(provider, props);
    }
    return Provider()
  }
}

interface IStateService {
  DynamicContext(action: string): void;
}

export function DynamicContextCreator(this: DynamicContext, initValue, reducer?): void {
  this.context = createContext(initValue);
  this.useContext = () => useContext(this.context);
  this.dispatcher = () => { };
  this.isReady = false;

  this._reducer = (state, action) => {
    return { ...state, ...action };
  }

  this.Provider = (props) => {
    const [state, dispatch]: any = useReducer(reducer ? reducer : this._reducer, props.initialValue ?? initValue);

    useEffect(() => {
      console.log("[Store ready]")
      if (!this.isReady) {
        this.dispatcher = dispatch;
        this.isReady = true;
      }
    }, []);

    return wrapWithProvider(this.context.Provider)({ ...props, value: [state, dispatch] });
  };

  // console.log("[DynamicContextCreator]", this)
}

interface StateInterface<T, U> {
  state: T,
}

interface ProviderInterface<S> {
  initialValue: S,
  children: any
}

export class DynamicStore<S, A = any> {
  dispatcher: any;
  isReady: boolean;
  Provider: any;
  state: S;
  context: Context<any>;
  useContext: () => [S, any];
  _reducer: (state: any, action: any) => any;

  constructor(name, initial: S, reducer?) {
    this.context = createContext<S>(initial);
    this.useContext = () => useContext<[S, any]>(this.context);
    this.dispatcher = () => { };
    this.isReady = false;
    this.state = initial;
    this._reducer = (state, action) => {
      return { ...state, ...action };
    }
  
    this.Provider = (props: ProviderInterface<S>) => {
      const [state, dispatch]= useReducer<ReducerWithoutAction<S>, S>(reducer ? reducer : this._reducer, props.initialValue ?? initial, () => props.initialValue ?? initial);
  
      useEffect(() => {
        if (!this.isReady) {
          this.dispatcher = dispatch;
          this.isReady = true;
        }
      }, []);

      useEffect(() => {
          this.state = state;
      }, [state]);
  
      return wrapWithProvider(this.context.Provider)({ ...props, value: [state, dispatch] });
    }
  }

}


export default DynamicContextCreator;