import { bootstrapApp } from "@/AppInit";
import { AuthService, initilizeUserService } from "@/services/AuthService";
import ModulesService from "@/services/ModuleService";
import ThemeService from "@/services/ThemeService";
import { InitilizeWidget, WidgetsModule } from "@/services/WidgetService";
import '@sass/_theme.scss';

let AppModular: any = null;

const appBoot = async (cfg) => {
  const { theme, user, errors, token, localWidgets, userToken } = cfg;
  let themeTarget = ThemeService.defaultAppTheme;

  InitilizeWidget({ widgets: localWidgets.filter((w) => w.installed) });
  initilizeUserService({user, token});

  if (typeof errors !== 'undefined') {
    if (errors.user) {
      await AuthService.tokenReleas();
    }
  }

  if (token) {
    await ModulesService.initModule(user);
    themeTarget = user.theme;
  } else {
    themeTarget = ThemeService.defaultAppTheme;
  }

  await ThemeService.setTheme(themeTarget);


  bootstrapApp(cfg);
}

export default appBoot;