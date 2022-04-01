import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";

const defaultTheme = "theme-default";

const localTheme = localStorage.getItem("theme") ?? defaultTheme;

const ThemeState = {
  theme: localTheme,
};



export function themeReducer(state: any, dispatcher: any): any {
  const {
    action, payload
  } = dispatcher;


  let returnState = {
    ...state,
    ...payload
  };

  return Object.assign({}, returnState);
}

const ThemeContext: any = createContext(ThemeState);

const useTheme: any = () => useContext(ThemeContext);
const useThemeReducer: any = () => useReducer(themeReducer, ThemeState);


export const setTheme = (obj) => {
  // const [theme, dispatcher] = useThemeReducer;

  return {
    type: "SET_THEME",
    payload: obj

  }
}

const ThemeProvider = (props) => {
  const [theme, setTheme] = useThemeReducer();

  useEffect(() => {
  }, [])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  )
}


export { ThemeProvider, ThemeContext, useTheme };