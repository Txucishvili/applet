import { memo } from 'react';
// import '@sass/_theme.scss';
import './App.scss';
import '@sass/_base.scss';
import { useRoutes } from 'react-router-dom';
import { RouterStore } from './store/routerContext';

function App() {
  const [routes, setRoutes]: any = RouterStore.useContext();

  let element = useRoutes(routes.routes);
  // console.log("routes changed", routes.routes)

  return (
    <div className="App">
        {element}
    </div>
  );
}

const AppMemo = memo(App, () => false);

export default AppMemo;
