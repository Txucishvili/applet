import React, { forwardRef, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.scss';
import '@sass/_base.scss';
import { useTheme } from './store';
import ThemeService from './services/Theme';
import { Route, Router, Routes, useRoutes } from 'react-router-dom';
import ReactRoutes from '@/routes';



function App() {
  const ref = useRef(null);
  const [theme,] = useTheme();

  useEffect(() => {
    ThemeService.setTheme(theme.theme);
  }, [theme])

  let element = useRoutes(ReactRoutes);


  return (
    <div className="App">
      {/* <Routes>
        {ReactRoutes.map((r: any, key) => {
          const Component: any = r.component;

          const RouteTarget = null;

          if (!r.children.length) {
            return <Route key={key} path={r.path} element={<Component />} />
          } else {
            return <Route key={key} path={r.path} element={<Component />}>
              {r.children.map((child, ckey) => {
                console.log(child);
                const ChildRouteComponent = child.component;
                const attrs = child.attrs && child.attrs.length ? child.attrs : [];
                return <Route index={!!attrs.includes('index')} {...attrs} key={ckey} path={child.path} element={<ChildRouteComponent />} />
              })}
            </Route>
          }

        })}
      </Routes> */}
        {element}
      {/* <Layout>
        <SideNav isOpen={true}>
          sidenav
        </SideNav>
        <Content />
      </Layout> */}
    </div>
  );
}

export default App;
