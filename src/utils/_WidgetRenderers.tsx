import { WidgetsModule, WidgetsStore } from "@/services/WidgetService";
import { createElement, memo, useCallback, useEffect } from "react";

export const _WidgetRendererHOC: React.FC<any> = (props: any) => {
  const { name } = props;
  const [widgets,]: any = WidgetsStore.use();

  // console.log('[1]', name);

  // useEffect(() => {
  //   console.log("----- keys", widgets.keys)
  // });



  useEffect(() => {
    console.log('[Keys Changed]', widgets);
    if (widgets.widgets[name] && !widgets.widgets[name].isLoaded) {
      // WidgetsModule.addWidget(name);
    }
  }, [widgets.keys]);

  // console.log('--------- Widgets', name, widgets.widgets[name]);
  if (!widgets.widgets[name] || !widgets.keys.includes(name)) {
    const NotFound = () => {
      return null
    };

    return <NotFound />;
  }

  const Component = () => {
    console.log("[RENDERING]", name)
    return <div>
      {widgets.widgets[name].isLoading ? "loading..." : null}
      {widgets.widgets[name].isLoaded
        ? WidgetsModule.widgets[name]()
        : null}
    </div>
  };

  const CMemo = memo(Component);

  return <CMemo />

  if (typeof widgets.widgets[name] === 'undefined') {
    return <div>no widget found</div>
  } else {
    console.log("------------------", WidgetsModule.widgets[name])
    if (!!WidgetsModule.widgets[name]) {
      const Component = () => {
        return <div>
          {widgets.widgets[name].isLoading ? "loading" : "loaded"}
          {/* {widgets.widgets[name] ? widgets.widgets[name].isLoading.toString() : "null"} */}
          {createElement('div', {}, WidgetsModule.widgets[name]())}
        </div>
      };

      return <Component />
    }
  }


  // if (typeof widgets.widgets[name] === 'undefined') {
  //   return <div>no widget found</div>
  // } else if (widgets.widgets[name].isLoading) {
  //   return <div>loading... {name}</div>
  // } else (!widgets.widgets[name].isLoading && widgets.widgets[name].isLoaded && WidgetsModule.widgets[name]) {
  //   return <div>
  //     loaded
  //     {/* {createElement('div', {}, WidgetsModule.widgets[name])} */}
  //   </div>
  // }

  // if (!!WidgetsModule.widgets[name]) {
  //   console.log("----", WidgetsModule.widgets[name])
  //   return <div>
  //     widget loaded
  //   </div>
  // }


  return null;

  // if (typeof widgets.widgets[name] == 'undefined') {
  //   return createElement('div', {}, 'no widget found');
  // }

  // if (widgets.widgets[name] && WidgetsModule.widgets[name]) {
  //   return createElement('div', {}, 'isLoading');
  // }

  // if (WidgetsModule == null || WidgetsModule !== null && !WidgetsModule.widgets[name]) {
  //   return createElement('div', {}, 'no widget found');
  // }

  // const Component = () => {
  //   return <div>
  //     {/* {widgets.widgets[name] ? widgets.widgets[name].isLoading.toString() : "null"} */}
  //     {createElement('div', {}, WidgetsModule.widgets[name]())}
  //   </div>
  // };

  // return <Component />
}

export const _WidgetRenderer = memo(_WidgetRendererHOC, () => true);

export const WidgetRenderer = (props) => {
  const {children} = props;

  return <div>
    {children}
  </div>
};