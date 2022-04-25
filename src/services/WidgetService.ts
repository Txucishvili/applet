import { cloneDeep } from 'lodash';
import {
  DynamicStore
} from './index';

export let WidgetsModule: any = null;

const initialState = {
  widgets: {},
  keys: []
};

export const WidgetsStore = new DynamicStore("WidgetsStore", initialState, (state, action) => {
  switch (action.type) {
    case "SET_WIDGETS":
      const _localData = {};
      let _localKeys = [...state.keys];

      action.payload.forEach((w) => {
        if (!state.widgets[w] || !state.widgets[w].isLoaded) {
          _localData[w] = {
            key: w,
            isLoading: false,
            isLoaded: false
          };
        }

        if (!_localKeys.includes(w)) {
          _localKeys = _localKeys.concat(w);
        }
      });

      return {
        ...state,
        keys: _localKeys,
        widgets: { ...state.widgets, ..._localData }
      }
      break;
    case "LOAD_WIDGET":
      const _loadWidget = Object.assign({}, {
        [action.payload]: {
          ...state.widgets[action.payload],
          isLoading: false,
          isLoaded: true
        }
      });
      return {
        ...state,
        widgets: { ...state.widgets, ..._loadWidget }
      }
      break;
    case "LOAD_WIDGET_DONE":
      const _loadWidgetDone = Object.assign({}, {
        [action.payload]: {
          ...state.widgets[action.payload],
          isLoading: false,
          isLoaded: true
        }
      });
      return {
        ...state,
        widgets: { ...state.widgets, ..._loadWidgetDone }
      }
      break;
    case "RESET":
      return {
        ...state,
        keys: [],
        widgets: {}
      }
      break;
    case "REMOVE":
      // console.log("new keys", state.keys.filter((w) => w !== action.payload))
      const _removedWidgets = { ...state.widgets };
      const _removedKeys = [...state.keys];
      const current = state.keys.find(i => i === action.payload);

      _removedKeys.splice(state.keys.indexOf(current), 1);
      delete _removedWidgets[action.payload];

      return {
        ...state,
        keys: _removedKeys,
        widgets: _removedWidgets
      }
      break;
    default:
      break;
  }
});


export const InitilizeWidget = async (user) => {
  return new Promise(async (r: any) => {
    WidgetsModule = new WidgetsModular(user);

    const widgetConvert: any = user.widgets.reduce((acc, el) => {
      return {
        ...acc,
        ...{
          [el.id]: {
            key: el.id,
            isLoaded: false,
            isLoading: false,
          }
        }
      }
    }, {});

    Object.assign(initialState, {
      widgets: widgetConvert,
      keys: Object.keys(widgetConvert)
    });

    // console.log("ObinitialState", widgetConvert)

    WidgetsStore.onReady = (e) => {
      // WidgetsModule.setWidgets(user.widgets);
      // console.log("Setting up widgets", user.widgets)
    }
    r();

  })
}

class WidgetsModular {
  widgetsKey: any[] = [];
  widgets: any = {};

  constructor(props) {
    this.widgetsKey = props.widgets;
  }

  setWidgets(widget: string | string[]) {
    let _requestList: string[] = [];
    _requestList = _requestList.concat(widget);
    // console.log("Setting widget", widget)

    WidgetsStore.dispatcher({
      type: "SET_WIDGETS",
      payload: _requestList
    });
  }

  async loadWidget(widget: string) {
    // this.setWidgets(widget);

    WidgetsStore.dispatcher({
      type: "LOAD_WIDGET",
      payload: widget
    });

    // const _widget = await this._loadWidget(widget)
    // .catch(e => e);
    // if (!_widget) {
    //   return;
    // }
    // console.log("LOADED")
    // WidgetsStore.dispatcher({
    //   type: "LOAD_WIDGET_DONE",
    //   payload: widget
    // });

    // return new Promise((r) => r(_widget));
  }



  removeWidgets(w) {
    WidgetsStore.dispatcher({
      type: "REMOVE",
      payload: w
    })
  }

  reset() {
    this.widgets = {};
    this.widgetsKey = [];
    WidgetsStore.dispatcher({
      type: "RESET"
    })
  }

  _loadWidget(name) {

    // return import(
    //   /* webpackChunkName: "widgets-[request]" */
    //   /* webpackMode: "lazy" */
    //   `../modules/Widgets/${name}/${name}.tsx`
    // );

    return new Promise((r) => {
      setTimeout(() => {
        const w = import(
          /* webpackChunkName: "widgets-[request]" */
          /* webpackMode: "lazy" */
          `../modules/Widgets/${name}/${name}`
        );
        r(w)
      }, 1500);
    })
  }

}

// const WidgetsModule = new WidgetsModule()

export default WidgetsModular;