import React from 'react';
import '@sass/Layout/header.scss';
import { useUser } from '@/store/context/UserContext';
import UserService from '@/services/UserService';
import ThemeSwitcherButtons from '../ThemeSwitcherButtons';


interface Props {
}

const Header = (props: Props) => {
  const [user, setUser] = useUser();


  const signIn = async () => {
    await UserService.signIn('username', 'password')
      .then(r => {
        setUser({
          action: "SET_USER",
          payload: r
        });
      })
  }

  const signInManager = () => {
    UserService.signIn('manager', 'password')
      .then(r => {
        console.log("------")
        setUser({
          action: "SET_USER",
          payload: r
        });
      })
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
