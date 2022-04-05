import { useEffect } from 'react';
// import '@sass/_theme.scss';
import './App.scss';
import '@sass/_base.scss';
// import { useTheme } from './store';
import ThemeService from './services/Theme';
import { useRoutes } from 'react-router-dom';
import ReactRoutes from "@/routes/index";
import { UserStore } from './services/UserService';

function App() {
  // const [theme,] = useTheme();

  // useEffect(() => {
  //   ThemeService.setTheme(theme.theme);
  // }, [theme])
  useEffect(() => {
    console.log("[AppLoaded DONE]")
  }, [])

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
      {/* <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/category" element={<CategoriesView />} />
          <Route path="/list" element={<ListsView />} />
          <Route path="/bookmark" element={<BookmarkViews />} />
          <Route path="/setting" element={<SettingView />} />
        </Route>
      </Routes> */}
    </div>
  );
}

export default App;
