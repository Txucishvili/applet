// 
// booting app
// 

import {bootConfig} from "./boot/boot";

const initApp = () => {
  import(
      /* webpackChunkName: "app" */
      `./AppInit`
  )
}

const init = () => {
  bootConfig();
  initApp();
};

init();

export {init};