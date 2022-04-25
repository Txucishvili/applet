import { ThemeStore } from '@/services/ThemeService';
import React, { Fragment } from 'react';

interface Props {
}

const ThemeSwitcherButtons = (props: Props) => {
  const [theme, dispatch] = ThemeStore.useContext();

  function _setTheme(e) {
    dispatch({
      type: "SET_THEME",
      payload: {
        theme: `theme-${e}`
      }
    })
  }
    return <Fragment>
      <button onClick={() => _setTheme("default")}>deault</button>
          <button onClick={() => _setTheme('custom')}>custom</button>
          <button onClick={() => _setTheme('light')}>light</button>
    </Fragment>;
};

export default ThemeSwitcherButtons;
