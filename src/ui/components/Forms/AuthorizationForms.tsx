import UserAPI from "@/services/API/AuthAPI";
import Grid from "@/ui/Layout/Grid";
import { Form } from "@/ui/Shared";
import { Button } from "@ui/Shared";
import { useDebounceEffect, useRequest } from "ahooks";
import { useFormik } from "formik";
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import * as Yup from 'yup';

export interface IAuthFormProps extends React.PropsWithRef<any> {
  onSubmit: any;
}

interface IFormProps {
  onSubmit: any;
  formRef?: React.ForwardedRef<any>;
  initialValues?: any;
}

export function SignInForms(props: IFormProps) {
  const [isLoading, setLoading] = useState<boolean>(false);

  useImperativeHandle(props.formRef, () => ({
    focus: () => {
      console.log('object');
    },
    form: formik,
    setLoader: (value: boolean) => {
      setLoading(value);
    }
  }));

  // formik.validateForm
  const formik = useFormik({
    initialStatus: 'none',
    validateOnChange: false,
    initialValues: {
      ...props.initialValues
    },
    async onSubmit(values) {
      console.log("[Formik Submit]", values);
      // props.onSubmit();

    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Required"),
      password: Yup.string()
        .min(4, "Must be more than 8 characters")
        .required("Required"),
    }),
  });


  const onSubmit = async (e) => {
    e.preventDefault()
    // formik.setTouched();
    // formik.validateForm();
    // formik.handleSubmit();

    // formik.setValues({
    //   email: 'some',
    //   password: 'some2'
    // });
    // console.log('formik', formik)
    // formik.submitForm();
    props.onSubmit();
    if (!formik.isValid) {
    }
  }

  return (
    <Form.Box style={{ width: '350px' }} onSubmit={onSubmit} autoComplete={'off'} className="divide-v-20">
      {isLoading ? 'loading' : null}
      <Form.Field
        onChange={formik.getFieldProps('email').onChange}
        value={formik.values.email}
        formik={formik.getFieldMeta('email')}
        type={'text'}
        placeholder='example@mail.com'
        label="EMAIL"
        name="email">
      </Form.Field>
      <Form.Field
        onChange={formik.getFieldProps('password').onChange}
        value={formik.values.password}
        formik={formik.getFieldMeta('password')}
        type={'password'}
        placeholder='***********'
        label="PASSWORD"
        name="password">
      </Form.Field>
      <div className="links _flx">
        <div className="remember">
          <Form.Field className='_reverse' type={'checkbox'} label="Remember" name="remember" />
        </div>
        <div className="lost-pass to-right">
          <a href="">Lost password?</a>
        </div>
      </div>
      <div className="btn-area">
        <Button type="submit" variant='light' size='large' text='Log in' wide />
      </div>
    </Form.Box>
  )

}

export function SignUpForms(props: IFormProps) {

  useImperativeHandle(props.formRef, () => ({
    focus: () => {
      console.log('object');
    },
    form: formik
  }));

  const formik = useFormik({
    initialStatus: 'none',
    validateOnChange: true,
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
      confPassword: "",
    },
    async onSubmit(values) {
      // console.log("[Formik Submit]", values);
      // props.onSubmit();

    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email()
        .required("Required"),
      firstName: Yup.string()
        .min(4, "Must be more than 4 characters")
        .required("Required"),
      lastName: Yup.string()
        .min(4, "Must be more than 4 characters")
        .required("Required"),
      password: Yup.string()
        .min(8, "Must be more than 8 characters")
        .required("Required"),
      confPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      userName: Yup.string()
        .min(4, "Must be more than 4 characters")
        .required("Required"),
    }),
  });

  const onSubmit = async (e) => {
    e.preventDefault()
    props.onSubmit();
  }

   
  useDebounceEffect(
    () => {

      if (!formik.errors.email && formik.values.email) {
        console.log('check')
      }
      
    },
    [formik.values.email],
    {
      wait: 1000,
    },
  );
  
  return (
    <div style={{ width: 600 }}>
      <Form.Box autoComplete="off" >
        <Grid
          container-outer
          container-fluid
          className='divide-v-20'
        >
          <Grid.Row>
            <Grid.Col md={'6'}>
              <Form.Field
                type={'text'}
                placeholder='john'
                label="First name"
                {...formik.getFieldProps('firstName')}
                formik={formik.getFieldMeta('firstName')}

                name="firstName">
              </Form.Field>
            </Grid.Col>
            <Grid.Col md={'6'}><Form.Field
              type={'text'}
              placeholder='doe'
              label="Last name"
              {...formik.getFieldProps('lastName')}
              formik={formik.getFieldMeta('lastName')}

              name="lastName">
            </Form.Field>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col md={'6'}>
              <Form.Field
                type={'text'}
                placeholder='johnDooooe'
                label="User name"
                {...formik.getFieldProps('userName')}
                formik={formik.getFieldMeta('userName')}

                name="userName">
              </Form.Field>
            </Grid.Col>
            <Grid.Col md={'6'}>
              <Form.Field
                type={'email'}
                placeholder='example@mail.com'
                label="Email"
                {...formik.getFieldProps('email')}
                formik={formik.getFieldMeta('email')}

                name="email">
              </Form.Field>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col md={'6'}>
              <Form.Field
                type={'password'}
                placeholder='***********'
                label="Password"
                {...formik.getFieldProps('password')}
                formik={formik.getFieldMeta('password')}

                name="password">
              </Form.Field>
            </Grid.Col>
            <Grid.Col md={'6'}>
              <Form.Field
                type={'password'}
                placeholder='***********'
                label="Conf password"
                {...formik.getFieldProps('confPassword')}
                formik={formik.getFieldMeta('confPassword')}

                name="confPassword">
              </Form.Field>
            </Grid.Col>
          </Grid.Row>
          <div className="btn-area">
            <Button onClick={onSubmit} type="submit" variant='light' size='large' text='Log in' wide />
          </div>
        </Grid>
      </Form.Box>
    </div>
  )
}


export const SignInForm = React.forwardRef((props: IFormProps, ref) => {
  return <SignInForms {...props} formRef={ref} />;
});

export const SignUpForm = React.forwardRef((props: IFormProps, ref) => {
  return <SignUpForms {...props} formRef={ref} />;
});
