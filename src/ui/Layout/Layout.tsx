import React, { Fragment, ReactElement, useEffect } from 'react';
import '@sass/Layout/Layout.scss';
import SideNav from './SideNav';
import Content from './Content';
import { Outlet } from 'react-router-dom';


interface Props {
  children: any;
}

const Layout = (props: any) => {
  useEffect(() => {
  }, [])
  return (

    <div>
      <SideNav isOpen={true}>
        sidenav
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </div>

  );
};

export default Layout;
