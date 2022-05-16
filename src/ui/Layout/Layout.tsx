import React, { Fragment, ReactElement, useEffect } from 'react';
import '@sass/Layout/Layout.scss';
import SideNav from './SideNav';
import Content from './Content';
import { Outlet } from 'react-router-dom';
import { NavigationStore } from '@/services/NavigationService';


interface Props {
  children: any;
}

const Layout = (props: any) => {
  useEffect(() => {
  }, [])
  return (

    <div>
      <NavigationStore.Provider>
        <SideNav isOpen={true}>
          sidenav
        </SideNav>
      </NavigationStore.Provider>
      <Content>
        <Outlet />
      </Content>
    </div>

  );
};

export default Layout;
