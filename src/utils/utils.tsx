import { globalComponents, ModulesStore } from "@/services/ModuleService";
import { ManagerBlockListComponent } from "@/ui/components/BlockList/BlockList.manager";
import React, { createElement, forwardRef, Fragment, memo, ReactNode, useEffect, useRef } from "react";
import { cloneElement } from "react";

export const ModuleRenderer = (props) => {
  let { target, component, type } = props;
  const [modules, setModules]: any = ModulesStore.use();

  // if (user.roles && type == 'switcher') {
  //   target = user.roles !== null ? user.roles[user.roles.length - 1] : []
  // }


  useEffect(() => {
    console.log("[ModuleRenderer]", modules)
  }, [modules])

  if (!!globalComponents[target]) {
    // console.log("------------")
    return createElement(globalComponents[target].default[component], {
      key: 'block._uid',
      onClick: props.onClick
    });
  }

  return null;

  return createElement(
    () => <div>The component has not been created yet.</div>,
    { key: "block._uid" }
  );
}


// root switch component
export const SimpleWrapper = (props) => {
  return props.children
}

export interface SwitchComponentProps {
  name?: string;
  children: ReactNode;
  schema?: any;
  target: string;
  component: string;
  getSchema?: any;
  type?: 'replace' | 'switch';
  user?: any;
};

export const SwitchComponentMain = <T extends object>(props: SwitchComponentProps) => {
  let { name, children, target, component, type } = props;
  const [module,] = ModulesStore.use();

  useEffect(() => {
    console.log("[ModuleRenderer]", module)
  }, [module])


  if (typeof type == 'undefined') {
    type = 'replace';
  }


  if (target == 'shared' && globalComponents['shared']) {
    const Element: Function = globalComponents['shared'].Components[component];
    return <SimpleWrapper>
      <Element {...props} />
    </SimpleWrapper>
  }

  if (globalComponents.module !== null) {


    if (type == 'switch' && globalComponents.module[target][component]) {
      const Element: Function = globalComponents.module[target][component];
      return <SimpleWrapper>
        {Element(props)}
      </SimpleWrapper>
    }
  }

  return <SimpleWrapper>
    <div key={name}>{props.children}</div>
  </SimpleWrapper>
}

export const SwitchComponent = SwitchComponentMain

export default {};