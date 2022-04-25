import { WidgetsModule, WidgetsStore } from "@/services/WidgetService";
import React, { cloneElement, createElement } from "react";

export const wrapWithEl = (props) => {
  return (c) => {
    // console.log("--------", c, props)
    // console.log('object', c, props)
    return createElement(
      'div',
      { key: c.key, ...props },
      c.type instanceof Function
        ? createElement(c.type, { key: c.key, ...c.props, ...props })
        : createElement('div', { key: c.key, ...c.props, ...props }));
  };
}

export const mapChildsWithKey = (config, childs) => {
  const _childs: any = {};

  // console.log("----", childs)

  React.Children.forEach(childs, (_child, key) => {
    if (!!_child) {
      _childs[_child.key] = {};
      _childs[_child.key].wrapper = wrapWithEl(config[_child.key])(_child);
      _childs[_child.key]['target'] = _childs[_child.key].wrapper.props.children;
    }
  });
  return _childs;
}

