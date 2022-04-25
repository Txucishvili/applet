import React, { lazy, memo, Suspense, useEffect } from "react";
import { WidgetsModule, WidgetsStore } from "@/services/WidgetService";
import { createElement } from "react";
import { cloneElement } from "react";

const WidgetRender = (props) => {
  return <Suspense key={1} fallback={'loading'}>
    {props.children}
  </Suspense>
}

const WidgetRenderMemo = memo(WidgetRender, () => true)

export const WidgetRenderers = (props) => {
  const { children, name, widgets } = props;
  // const [widgets, setWidgets]: any = WidgetsStore.useContext();

  console.log("[WidgetRender]", name, widgets);

  useEffect(() => {
    if (widgets.widgets[name] && !widgets.widgets[name].isLoaded && !widgets.widgets[name].isLoading) {
      WidgetsModule.loadWidget(name);
    }
  }, [widgets]);


  if (widgets && widgets.widgets && !widgets.widgets[name]) {
    return null;
  } else if (widgets.widgets[name] && !widgets.widgets[name].isLoaded && widgets.widgets[name].isLoading) {
    return <div>Loading... {name}</div>
  } else {
    const WidgetComponent = lazy(() => import(`@/modules/Widgets/${name}/${name}`));

    return <Suspense key={1} fallback={'loading'}>
      <WidgetComponent />
  </Suspense>
  }
};

export const WidgetRendererMemo = memo(WidgetRenderers, (prevProps, nextProps) => {
  console.log("WidgetRenderer-", nextProps.name, prevProps.widgets.keys.includes(nextProps.name) && !nextProps.widgets.keys.includes(nextProps.name) || !prevProps.widgets.keys.includes(nextProps.name) && nextProps.widgets.keys.includes(nextProps.name))
  if (
    prevProps.widgets.keys.includes(nextProps.name) && !nextProps.widgets.keys.includes(nextProps.name)
    || !prevProps.widgets.keys.includes(nextProps.name) && nextProps.widgets.keys.includes(nextProps.name)) {
    return false
  }
  return true;
});

const withWidgets = (c) => {
  return (props) => {
    const [widgets, setWidgets]: any = WidgetsStore.useContext();
    if(!widgets.keys.includes(props.name)) {
      return null;
    }
    return <WidgetRendererMemo {...props} widgets={widgets} />;
  };
}

export const WidgetRenderer = withWidgets(WidgetRendererMemo);