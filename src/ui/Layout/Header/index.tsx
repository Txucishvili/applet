import { memo, useEffect, useRef, useState } from 'react';
import '@sass/Layout/header.scss';
import { SwitchComponent } from '@/utils/utils';
import Button from '@/ui/Shared/Button/Button';
import { AppModal } from '@/ui/Shared';
import UserInfo from '@/ui/components/Header/UserInfo';
import { AuthService, UserStore } from '@/services/AuthService';
import AuthAPI from '@/services/API/AuthAPI';


interface Props {
}

const Header = (props: Props) => {
  const [user, setUser] = UserStore.use();


  return <div className="container-xl">
    <div className="row">
      <div className="col-md-12">
        <div className='header header--wrap _flx'>
          <div className="title-area">
            <div onClick={() => {
              // setauthModal(true)
            }} className="header--title">
              Applet
            </div>
          </div>
          <div className="header--userarea _fr">
            <div className="auth-area divide-h-6" style={{ display: 'flex' }}>


              <UserInfo />
              
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
};

const HeaderMemo = memo(Header, () => false)

export default HeaderMemo;
