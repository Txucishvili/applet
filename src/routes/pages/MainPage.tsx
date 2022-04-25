import WidgetsModular, { WidgetsModule, WidgetsStore } from '@/services/WidgetService';
import Button from '@/ui/Shared/Button/Button';
import Form from '@/ui/Shared/Form';
import { WidgetRenderer } from '@/utils/WidgetRenderer';
import axios from 'axios';
import { useFormik } from 'formik';
import { memo, useEffect, useState } from 'react';
import * as Yup from 'yup';

const ButtonsView = () => {

  useEffect(() => {

  })
  return <div className='divide-list-h-10' style={{ display: 'flex' }}>
    <Button
      onClick={() => {
        axios.post('http://localhost:5000/auth/login', 
        {email: 'string', password: 'string'})
        .then(r => { console.log(r) })
      }}
      variant='primary' text='primary' />
    <Button variant='secondary' text='secondary' />
    <Button variant='outline' text='outline' />
    <Button variant='light' text='light' />
    <Button variant='dark' text='dark' />
    <Button variant='success' text='success' />
    <Button variant='warning' text='warning' />
    <Button variant='danger' text='danger' />
    <Button variant='info' text='info' />
  </div>
}

export function MainPageView({ children }) {
  const [widgets, setWidgets]: any = WidgetsStore.useContext();

  console.log("widgets", widgets)

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
  const [widgets, setWidgets]: any = WidgetsStore.useContext();


  useEffect(() => {
    console.log("----[setState]", state);
  }, [state])



  return (
    <div className='container-outer'>
      <div className="container-xl">

        <div className="row">
          <div className="col-md-6">
            <WidgetRenderer name="Widget1" />
          </div>
          <div className="col-md-6">
            <WidgetRenderer name="Widget2" />
          </div>

        </div>

        <br />
        <div className="row">
          <ButtonsView />
        </div>
        <br />

      </div>
    </div>
  )
}


export default Main;