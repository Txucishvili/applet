import React from 'react';
import '@sass/Layout/header.scss';
import UserService, { UserStore } from '@/services/UserService';
import ThemeSwitcherButtons from '../ThemeSwitcherButtons';
import ThemeService, { ThemeStore } from '@/services/Theme';


interface Props {
}

const Header = (props: Props) => {
  const [user, setUser] = UserStore.useContext();
  const [theme, setTheme] = ThemeStore.useContext();


  const signIn = async () => {
    await UserService.signIn('username', 'password')
      .then((r: any) => {
        // setUser({
        //   type: "SET_USER",
        //   payload: r
        // });
        // setTheme({
        //   theme: r.theme
        // });
        // ThemeService.setTheme(r.theme)
      })
  }

  const signInManager = () => {
    UserService.signIn('manager', 'password')
      .then((r: any) => {
        // setUser({
        //   type: "SET_USER",
        //   payload: r
        // });
        // setTheme({
        //   theme: r.theme
        // });
        // ThemeService.setTheme(r.theme)
      })
  }
  const signOut = () => {
    UserService.signOut().then((r: any) => {
      // setUser({
      //   type: "SET_SIGNOUT",
      //   payload: null
      // });
      // setTheme({
      //   theme: "theme-default"
      // });
      // ThemeService.setTheme('theme-default')
    });
  }

  return <div className='header header--wrap _flx'>
    <div className="title-area">
      <div className="header--title">
        Applet
      </div>
    </div>
    <div className="header--userarea _fr">
      <div className="auth-area">
        <button onClick={() => signIn()}>set user</button>
        <button onClick={() => signInManager()}>set Manager</button>
        <button onClick={() => signOut()}>log out</button>
        {
          user.userName ? user.userName : null
        }
      </div>
      <div className="theme-switching">
        {/* <ThemeSwitcherButtons /> */}
      </div>
    </div>
  </div>;
};

export default Header;
