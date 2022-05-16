import { WIDGETS_KEYS } from '@/modules/Widgets';
import { UserStore } from '@/services/AuthService';
import { WidgetsStore } from '@/services/WidgetService';
import { WidgetRenderer } from '@/utils/WidgetRenderer';
import { memo, useEffect, useState } from 'react';
import loadModules from './files/load';
// const importAll = require('../../macros/import-all.macro');
// import preval from 'preval.macro';


export function MainPageView({ children }) {
  const [widgets, setWidgets]: any = WidgetsStore.use();




  return (
    <div>
      <div className="container-xl">
        <div className="row">
          <h1>App Main</h1>
        </div>
        <br />


        <br />

        <div className="row">
          <div className="col-md-6">
            <WidgetRenderer name="Widget1" />
          </div>
          <div className="col-md-6">
            <WidgetRenderer name="Widget2" />
          </div>

        </div>
      </div>
    </div>
  )
}

const MainMemo = memo(MainPageView, () => true);

function Main() {
  const [state, setState] = useState({})
  const [widgets, setWidgets]: any = WidgetsStore.use();
  const [user,] = UserStore.use();

  useEffect(() => {
   loadModules('').then(r => {
     console.log('object')
   })
  }, [])

  return (
    <div className='container-outer'>
      <div className="container-xl">
        <p>{user.email}</p>
        <p>{user.theme}</p>
        <p>{user.type}</p>
        <div className="row">
          <div className="col-md-6">
            <WidgetRenderer name="Widget1" />
          </div>
          <div className="col-md-6">
            <WidgetRenderer name={WIDGETS_KEYS.Giphy} />
          </div>

        </div>

        <br />
        <div className="row">
          {/* <ButtonsView /> */}
        </div>
        <br />

      </div>
    </div>
  )
}


export default Main;