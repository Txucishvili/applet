import importAlls from '../../../macros/import-all.macro';
import preval from 'preval.macro';
import importAll from 'named-import-all.macro'

// const routes = importAll.deferredNamed('./files/*.js')

const approvedMOdules = [
  "./src/API/index.ts",
  "./src/modules/Shared/index.tsx"];

const loadModules = (file: any) => {


  const module = import(
    /* webpackChunkName: "moduleRequire"*/
    './loader'
  ).then((r) => {
    return 'modules'
  });

  return module;

}



export default loadModules;