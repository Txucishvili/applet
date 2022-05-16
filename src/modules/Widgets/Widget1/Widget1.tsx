import { memo, useEffect, useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from "@/ui/Shared/Button/Button";
import { Form, } from "@/ui/Shared";
import { DynamicStoreState } from "@/store";

const Widget1Store = new DynamicStoreState("Widget1", { input: "" }, (state, {type, payload}) => {

  return { ...state, input: payload }
});

const WidgetMain = (props) => {
  const [input, setInput] = Widget1Store.use();


  useEffect(() => {
    return () => {
      console.log("WIDNGET 1 Unmounted")
    }
  }, [])

  useEffect(() => {
    // console.log("input", input);
  }, [input])

  return <div style={{
    width: '100%',
    height: '180px',
    padding: '20px',
    backgroundColor: "var(---side-nav-bg-color)",
    borderRadius: '7px'
  }}>
    Widget 2
    <p>{input.input}</p>
    <input type="text" onChange={(e) => setInput({
      payload: e.target.value
    })} />
  </div>
}

const _Widget1 = (props) => {
  const [value, setvalue] = useState('');

  console.log("Widget1 RENDER",)


  return <Widget1Store.Provider>
    <WidgetMain />
    {Array(10).fill(null).map((e, key) => {
      return <div key={key} style={{
        width: '100%',
        height: 40 - (key * 2) + 'px',
        marginTop: '10px',
        backgroundColor: "var(---side-nav-bg-color)",
        borderRadius: '7px'
      }}>
        {/* Widget 2 */}
      </div>
    })}
  </Widget1Store.Provider>
}

const Widget1 = (props) => {
  const [state, setState] = useState({})

  const formik = useFormik({
    initialStatus: 'none',
    initialValues: {
      firstname: "",
      lastname: ""
    },
    async onSubmit(values) {
      console.log("[Formik Submit]", this);
      setState(values);
    },
    validationSchema: Yup.object().shape({
      firstname: Yup.string()
        .required("Required"),
      lastname: Yup.string()
        .min(8, "Must be more than 8 characters")
        .required("Required")
    }),
  });

  const onSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    // formik.setTouched();
    console.log("hitt", formik.values)
  }

  return <div className="el" style={{
    backgroundColor: 'var(---side-nav-bg-color)',
    borderRadius: 12,
    padding: '14px'
  }}>
    <Form.Box
      autoComplete="off"
      name="form1"
      onSubmit={onSubmit}
    >
      <div className="row">
        <div className="col-md-6">
          <Form.Field
            {...formik.getFieldProps('firstname')}
            formik={formik.getFieldMeta('firstname')}
            type={'text'}
            placeholder='Field A Text'
            label="FieldA"
            name="firstname">
          </Form.Field>

        </div>
        <div className="col-md-6">
          <Form.Field
            {...formik.getFieldProps('lastname')}
            formik={formik.getFieldMeta('lastname')}
            type={'text'}
            placeholder='Field B Text'
            label="FieldA"
            name="lastname">
          </Form.Field>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <Form.Field type={'radio'} label="FieldB" name="radioEl" />
        </div>
        <div className="col-md-3">
          <Form.Field type={'radio'} label="FieldB" name="radioEl" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <Form.Field type={'checkbox'} label="Field a" name="checkBoxEl" />
        </div>
        <div className="col-md-3">
          <Form.Field type={'checkbox'} label="Field a" name="checkBoxEl" />
        </div>
        <div className="col-md-3">
          <Form.Field type={'checkbox'} label="Field a" name="checkBoxEl" />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field A Text' name="fielda">
          </Form.Field>
        </div>
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field B Text' name="fielda">
          </Form.Field>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field A Text' name="fielda">
          </Form.Field>
        </div>
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field B Text' name="fielda">
          </Form.Field>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field A Text' name="fielda">
          </Form.Field>
        </div>
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field B Text' name="fielda">
          </Form.Field>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field A Text' name="fielda">
          </Form.Field>
        </div>
        <div className="col-md-6">
          <Form.Field onChange={(e) => {
            console.log('input changed', e.target.value)
          }} type={'text'} placeholder='Field B Text' name="fielda">
          </Form.Field>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Button type="submit" variant='light' size='large' text='Save' wide />
        </div>
      </div>
    </Form.Box>
  </div>
}

const Memo = memo(Widget1);

export default Memo;