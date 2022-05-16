import { DynamicStoreState } from "@/store";

interface ThemeServiceInterface {
  setLocalTheme: any
}

const APP_DEFAULT_THEME = 'simple';

const ThemeState = {
  theme: APP_DEFAULT_THEME,
};

export const ThemeStore = new DynamicStoreState('theme', ThemeState, (state: any, action: any) => {
  const {
    type, payload
  } = action;

  switch (type) {
    case "SET_THEME":
      return { ...state, ...payload }
      break;

    default:
      break;
  }

});

class ThemeServices implements ThemeServiceInterface {
  public themeName;
  public defaultAppTheme: string = APP_DEFAULT_THEME;

  setLocalTheme(e) {
    localStorage.setItem("local_theme", e)
  }

  setDefaultTheme() {
    this.setTheme(this.defaultAppTheme);
  }

  attachTheme(e) {
    const hasTheme = document.documentElement.classList.value.split(" ").find((e) => e.includes('theme'));
    if (!hasTheme) {
      document.documentElement.classList.add(`theme-${e}`);
    } else {
      document.documentElement.classList.remove(hasTheme)
      document.documentElement.classList.add(`theme-${e}`);
    }
  }

  setTheme(e) {
    return import(
      /* webpackChunkName: "theme-" */
      // /* webpackMode: "lazy" */

      `@sass/themes/_theme-${e}.scss`
    ).then((m) => {
      this.themeName = e;
      this.attachTheme(e);
      // !!!!
      ThemeStore.dispatch({
        type: "SET_THEME",
        payload: {
          theme: e
        }
      })
    });
  }
}

const ThemeService = new ThemeServices();

export default ThemeService;