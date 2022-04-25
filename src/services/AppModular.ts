import ModulesService from "./ModuleService";

export const globalComponents: any = {};

class AppModularService {
  globalModules: any = {};

  constructor(props) {
    console.log("AppModularService", props);
    this.loadApp(props);
  }

  async loadApp(props) {

  }
  
}


export default AppModularService;