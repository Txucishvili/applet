import { memo, useEffect, useRef, useState } from 'react';
import '@sass/Layout/header.scss';
import UserService, { UserStore } from '@/services/UserService';
import { SwitchComponent } from '@/utils/utils';
import Button from '@/ui/Shared/Button/Button';
import AppModal from '@/ui/Shared/Modal/AppModal';


interface Props {
}

const Header = (props: Props) => {
  const [user, setUser] = UserStore.useContext();
  const [authModal, setauthModal] = useState(false)
  // const [theme, setTheme] = ThemeStore.useContext();
  const replacer = useRef('null');

  useEffect(() => {
    // setauthModal(true);
  }, [])


  const signIn = async () => {
    await UserService.signIn('user', 'password')
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

  useEffect(() => {
  }, [])


  return <div className="container-xl">
    <div className="row">
      <div className="col-md-12">
        <div className='header header--wrap _flx'>
          <div className="title-area">
            <div onClick={() => setauthModal(true)} className="header--title">
              Applet
            </div>
          </div>
          <div className="header--userarea _fr">
            <div className="auth-area divide-h-6" style={{ display: 'flex' }}>
              {/* {user.userName ? user.userName : null} */}
              <Button
                onClick={() => signIn()}
                className="___outerClassName"
                text='User'
                variant={user.type == 'user' ? 'secondary' : 'primary'}>
              </Button>
              <Button
                onClick={() => signInManager()}
                className="___outerClassName"
                text='Manager'
                variant={user.type == 'manager' ? 'secondary' : 'primary'}>
              </Button>
              {/* <button onClick={() => signInManager()}>set Manager</button> */}
              <SwitchComponent
                type="replace"
                name="userArea"
                target="shared"
                component="SignOutButton">
              </SwitchComponent>
              {/* <ModuleRenderer onClick={() => signOut()} target="shared" component="SignOutButton" /> */}
              {/* <button onClick={() => signOut()}>log out</button> */}

            </div>
            <div className="theme-switching">
              {/* <ThemeSwitcherButtons /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppModal
      keyboard={true}
      onHide={() => setauthModal(false)}
      show={authModal}
    >
      <div className="auth-modal--wrap" >
        <p>Auth area</p>
        <Button
          onClick={() => signIn()}
          className="___outerClassName"
          text='User'
          variant={user.type == 'user' ? 'light' : 'secondary'} />
        <Button
          onClick={() => signInManager()}
          className="___outerClassName"
          text='Manager'
          variant={user.type == 'manager' ? 'light' : 'secondary'} />
      </div>
    </AppModal>
  </div>
};

const HeaderMemo = memo(Header, () => false)

export default HeaderMemo;
