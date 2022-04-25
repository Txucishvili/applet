import { DynamicContext } from "@/store";
import { DispatchWithoutAction, Reducer, ReducerWithoutAction } from "react";
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

interface ActionModel {
  type?: string;
  payload?: any;
}

export class DynamicStore<S, A = ActionModel> {
  dispatcher: (action: ActionModel) => void;
  isReady: boolean;
  Provider: any;
  state: S;
  context: Context<any>;
  useContext: <TS = S, TA = A> () => [TS, (dispatch:  TA) => any];
  onReady: (any) => any;
  reducer: ((state: S, action: ActionModel)=> any) | null;
  _reducer: (state: S, action: ActionModel) => any;

  constructor(name, initial: S, reducer?) {
    this.context = createContext<S>(initial);
    this.useContext = () => useContext(this.context);
    this.dispatcher = () => { };
    this.isReady = false;
    this.state = initial;
    this.reducer = null;
    this._reducer = (state, action) => {
      if (this.reducer !== null) {
        return this.reducer(reducer(state, action), action)
      }

      return reducer(state, action)
    }
    this.onReady = (value) => { };

    this.Provider = (props: ProviderInterface<S>) => {
      const [state, dispatch] = useReducer<Reducer<S, ActionModel>, S>(this._reducer, props.initialValue ?? initial, () => props.initialValue ?? initial);

      if (!this.isReady) {
        this.dispatcher = dispatch;
      }

      useEffect(() => {
        // console.log("------------------------------", name)
        this.isReady = true;
        this.onReady(this.isReady);

        return () => {
          this.isReady = false;
          this.dispatcher = () => { };
        }
      }, []);

      useEffect(() => {
        this.state = state;
      }, [state]);

      return wrapWithProvider(this.context.Provider)({ ...props, value: [state, dispatch] });
    }
  }

  setReducer(r: Reducer<S, ActionModel>) {
    this.reducer = r;
  }

}


export default DynamicContextCreator;