import { bootstrapApp } from "@/AppInit";
import ModulesService from "@/services/ModuleService";
import ThemeService from "@/services/ThemeService";
import WidgetsModular, { InitilizeWidget } from "@/services/WidgetService";
import '@sass/_theme.scss';

let AppModular: any = null;

const appBoot = async (cfg) => {
  const { theme, user } = cfg;

  //  await  import(
  //     /* webpackChunkName: "user-modular" */
  //     `../modules/${'Shared'}`
  //       )
  //   await import(
  //     /* webpackChunkName: "user-modular" */
  //     `../modules/${'User'}`
  //       )

  // AppModular = new AppModularService(cfg);
  await ThemeService.setTheme(cfg.theme.theme);


  const localWidgets: any = localStorage.getItem('widgets') ?? [];
  // console.log("[Installed widgets]", JSON.parse(localWidgets).filter((w) => w.installed))
  InitilizeWidget({
    widgets: JSON.parse(localWidgets).filter((w) => w.installed)
  });



  if (!!user && user.email) {
   
    await ModulesService.initModule(user);
    // console.log("user", user)
  }


  bootstrapApp(cfg);
}

export default appBoot;