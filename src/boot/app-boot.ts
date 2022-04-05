import { bootstrapApp } from "@/AppInit";
import ModulesService from "@/services/ModulesService";
import ThemeService from "@/services/Theme";
import '@sass/_theme.scss';

const initApp = async () => {
  return new Promise((r: any) => {
    r(bootstrapApp);
  })
}

const appBoot = async (cfg) => {
  const { theme, user } = cfg;

  initApp().then(async (m: any) => {
    if (!!user && user.email) {
      await ThemeService.setTheme(user.theme);
      await ModulesService.loadAppFor(user.type);
      m(cfg);
    } else {
      await ThemeService.setTheme(cfg.theme.theme);
      m(cfg);
    }
  });

}

export default appBoot;