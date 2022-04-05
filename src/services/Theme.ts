import { DynamicStore } from '@/services';
import DynamicContextCreator from ".";

interface ThemeServiceInterface {
  setLocalTheme: any
}
const ThemeState = {
  theme: "null",
};


export const ThemeStore = new DynamicStore('theme',ThemeState,(state: any, action: any) => {
  const {
    type, payload
  } = action;

  switch (type) {
    case "SET_THEME":
      return {...state, ...payload}
      break;
  
    default:
      break;
  }
  
});

class ThemeServices implements ThemeServiceInterface {
  public themeName;

  setLocalTheme(e) {
    localStorage.setItem("local_theme", e)
  }

  attachTheme(e) {
    const hasTheme = document.documentElement.classList.value.split(" ").find((e) => e.includes('theme'));
    if (!hasTheme) {
      document.documentElement.classList.add(`${e}`);
    } else {
      document.documentElement.classList.remove(hasTheme)
      document.documentElement.classList.add(`${e}`);
    }
  }

  setTheme(e) {
    return import(
      /* webpackChunkName: "theme" */
      // /* webpackMode: "lazy" */

      `@sass/themes/_${e}.scss`
    ).then((m) => {
      this.themeName = e;
      this.attachTheme(e);
      console.log("SETTING UP THEME");
      ThemeStore.dispatcher({
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