import { memo, useMemo } from 'react';
// import '@sass/_theme.scss';
import './App.scss';
import '@sass/_base.scss';
import { useRoutes } from 'react-router-dom';
import { RouterStore } from './services/RouterService';



function App() {
  const [routes, setRoutes]: any = RouterStore.use();

  // let element = useRoutes(routes.routes);

  let element2 = useMemo(() =>
    () => {
      {
        // console.log('RUTES CHANGED')
        const Routes = useRoutes(routes.routes);
        return Routes;
      }
    }
    , [routes]);


  return (
    <div className="App">
      {element2()}
    </div>
  );
}

const AppMemo = App;

export default AppMemo;
