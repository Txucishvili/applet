
import importAlls from '../../../macros/import-all.macro';
import preval from 'preval.macro';

const approvedMOdules = [
  "../../../../src/API/index.ts",
  "../../../../src/modules/Shared/index.tsx"];

export default function(path) {
  
  const moduleName = ["./src/API/index.ts", "./src/modules/Shared/index.tsx"];

  const modulesList = preval`
  const importAll = require('import-all.macro');
  const path = require('path');
  const glob = require("glob");

  const modulesList = glob.sync("./src/**/**");

  const appModules = "${approvedMOdules}".split(',');
  const requireModules = appModules.filter((m, i) => i > 0);


  
  const filteredModules = modulesList.filter((e) => requireModules.includes(e))
  const mappedPath = filteredModules.map(m => path.resolve('./', m));

  module.exports = mappedPath
`;

  console.log('modulesList', modulesList)

  return importAlls.sync(approvedMOdules);
  
};