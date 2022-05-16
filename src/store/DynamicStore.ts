import { Reducer, ReducerWithoutAction } from "react";
import { Context, createContext, createElement, useContext, useEffect, useReducer } from "react";

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

interface ProviderInterface<S> {
  initialValue?: S,
  children: any
}

interface ActionModel {
  type?: string;
  payload?: any;
}
let count = 0;
export class DynamicStoreState<S, A = ActionModel> {
  activeReducerKey: any;
  InitialReducer: Reducer<S, A>;
  reducerChain: WeakMap<object, any>;
  state: S;
  InitialValue: S | any;
  context: Context<any>;
  isReady: boolean = false;
  dispatch: <DA = ActionModel> (action: DA) => void = (action) => { };
  defaultOptions: any = {
    saveState: false
  }
  options: any;
  name: string;
  count: number = 0;
  
  constructor(name, initial: S, reducer?: Reducer<S, A>, options?) {
    this.name = name;
    this.InitialValue = initial ?? {};
    this.InitialReducer = reducer ?? this._simpleReducer;
    this.state = this.InitialValue;
    this.context = createContext<S>(this.InitialValue);

    this.reducerChain = new WeakMap();

    this.Provider = this.Provider.bind(this);
    this.reducer = this.reducer.bind(this);
    this.use = this.use.bind(this);

    //

    this.options = options ?? this.defaultOptions;
  }

  private _simpleReducer(state, action) {
    return { ...state };
  }

  // outside
  use<SA = S, NA = A>() {
    return useContext<[SA, ReducerWithoutAction<NA>]>(this.context)
  }

  onReady(status: boolean): any {
    return this.isReady;
  }

  addReducer<NA = A>(key, r: Reducer<S, NA>) {
    this.reducerChain.set(key, r);
    this.activeReducerKey = key;
    console.log('addReducer', this.reducerChain)
  }

  deleteReducer(key) {
    this.reducerChain.delete(key);
    console.log('deleteReducer', this.reducerChain)
  }

  // inside fn
  private reducer(_state, action): any {
    if (this.reducerChain.get(this.activeReducerKey)) {
      const fn = this.reducerChain.get(this.activeReducerKey);
      return this.InitialReducer(fn(_state,action), action);
    }

    return this.InitialReducer(_state, action);
  }

  private setDispatch(_dispatch) {
    this.dispatch = _dispatch;
  }

  private setReady(_state) {
    this.isReady = _state;
  }


  Provider(props: ProviderInterface<S>) {
    const [state, dispatch] = useReducer<Reducer<S, A>, S>(this.reducer, props.initialValue ?? this.InitialValue, () => props.initialValue ?? this.InitialValue);

    if (!this.isReady) {
      this.setDispatch(dispatch);
    }

    useEffect(() => {
      this.setReady(true);
      this.onReady(this.isReady);

      return () => {
        this.setReady(false);
        this.onReady(false);
        this.setDispatch(() => { });
        if (this.options.saveState) {
          this.InitialValue = this.state;
        }
      }
    }, []);

    // !!!!!
    this.state = state;

    useEffect(() => {
      // this.state = state;
    }, [state]);

    return wrapWithProvider(this.context.Provider)({ ...props, value: [state, dispatch] });
  }

};
