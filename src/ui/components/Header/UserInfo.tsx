import { createRef, Fragment, useEffect, useRef, useState } from 'react'
import { AppModal, Button } from '@/ui/Shared'
import { AuthService, UserStore } from '@/services/AuthService';
import AccountBox from './AccountBox';
import { SignInForm, SignUpForm, SignUpValidationSchema } from '../Forms/AuthorizationForms';
import { useDebounceEffect, useRequest } from 'ahooks';
import UserAPI from '@/services/API/AuthAPI';
import { ModalActive } from '../Modals/AuthenticationModal';
import SwitchAccountModal, { SwitchModalActionsProps } from '../Modals/SwitchAccountModal';
import { Formik } from 'formik';

export type ModalState = 'Auth' | 'AddNewUser';

export default function UserInfo() {
  const [user, setUser] = UserStore.use();
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState<ModalState>('Auth');
  const [activeView, setActiveView] = useState<ModalActive>("SignIn");
  const [switchModal, setSwitchModal] = useState(false);

  const isMounted = useRef<boolean>(false);

  let authModalRef: any = createRef();
  let signInFormRef: any = createRef();
  let signUpFormRef: any = createRef();


  const [signInInitalValues, setLoginInitial] = useState({
    email: '',
    password: ''
  });

  const [signUpFromInitial, setSignUpInitial] = useState({
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    confPassword: "",
  });


  const { runAsync: signInAsync, loading } = useRequest(UserAPI.signIn, {
    manual: true,
    onSuccess: async (e: any) => {
      if (modalState == 'AddNewUser') {
        AuthService.userAdd(e.data);
      } else {
        AuthService.userSet(e.data);
      }

      setModal(false);
      // modalState = 'Auth';
    },
    onError: (e) => {
      console.log('eror on fetch', authModalRef)

      signInFormRef.form.setErrors({
        email: 'email not found'
      });

    }
  });

  // const { runAsync: checkEmailAsync } = useRequest(UserAPI.checkEmail, {
  //   manual: true,
  //   onSuccess: async (e: any) => {
  //     console.log('[checkEmailAsync]', e);
  //     if (e.data.status == 400) {
  //       console.log('e', e)
  //       signUpFormRef.form.setFieldError('email', 'error on email')
  //     }
  //   },
  //   onError: (e) => {
  //     console.log('[checkEmailAsync] - error', signUpFormRef.form);
  //     signUpFormRef.form.setFieldError('email', 'error on email')
  //   }
  // });



  useEffect(() => {
    // console.log('appModalRef', authModalRef);
    isMounted.current = true;
  }, [])

  useEffect(() => {
    if (!isMounted) {
      return
    }
    setModalState(switchModal ? 'AddNewUser' : 'Auth');

  }, [switchModal])

  useEffect(() => {
    if (activeView == 'SignUp' && (signInInitalValues.email.length || signInInitalValues.password.length)) {
      // setLoginInitial({ email: '', password: '' })
    }
  }, [activeView])

  const openSignIn = () => {
    setModal(true);
    setActiveView('SignIn')
  }

  const openSignUp = () => {
    setModal(true);
    setActiveView('SignUp')
  }


  const onSwitchModalAction = (action: SwitchModalActionsProps['action'], value: any) => {
    const { } = value;
    switch (action) {
      case 'openUserAdd':
        setModal(true);
        console.log('object', value)
        // modalState = 'AddNewUser'
        break;
      case 'onModalClose':
        setSwitchModal(false);
        // modalState = 'Auth'
        break;
      case 'addUser':
        AuthService.userAdd(value);
        break;
      case 'removeUser':
        AuthService.userRemove(value.user.email);
        if (user.usersList.length <= 2) {
          setSwitchModal(false);
        }
        break;
      case 'setUser':
        AuthService.userSet({ user: value, token: value.token });
        break;

      default:
        break;
    }

  }

  return (
    <Fragment>
      {modalState}
      <div className='_flx divide-h-4'>
        {user.email
          ? <AccountBox
            openModal={() => {
              setSwitchModal(true);
              // modalState = 'AddNewUser';
            }} />
          : user.usersList.length
            ? <Fragment>
              <Button onClick={() => {
                setSwitchModal(true);
              }} variant='primary' text='Select Account' />
            </Fragment>
            : <Fragment>
              <Button onClick={openSignIn} variant='primary' text='Sign in' />
              <Button onClick={openSignUp} variant='primary' text='Sign up' />
            </Fragment>
        }
      </div>

      <SwitchAccountModal
        onAction={onSwitchModalAction}
        show={switchModal}
        user={user}
      />

      <AppModal
        keyboard={true}
        onHide={() => {
          setModal(false);
        }}
        show={modal}
        size="auto"
      >
        <AppModal.Body size='auto'>
          <AppModal.Head>
            {modalState == 'Auth'
              ? <div className="modal--title">
                {activeView == 'SignUp' ? 'Create new account' : 'Sign In'}
              </div>
              : <div className="modal--title">
                {activeView == 'SignUp' ? 'Add new account' : 'Add new account'}
              </div>}
          </AppModal.Head>


          {activeView == 'SignIn'
            ? <SignInForm
              ref={(ref) => (signInFormRef = ref)}
              initialValues={signInInitalValues}
              onSubmit={() => {
                signInFormRef.form.submitForm();
                console.log('{FORM VALID}', signInFormRef);
                signInFormRef.form.validateForm().then(r => {
                  if (!Object.entries(r).length) {
                    signInAsync(signInFormRef.form.values.email, signInFormRef.form.values.password);
                  }
                });
              }}
            />
            :
            <Formik
              validationSchema={SignUpValidationSchema}
              initialValues={signUpFromInitial}
              validateOnChange={true}
              onSubmit={(e) => {
                console.log('onFormikSubmit', e);
              }}
            >
              <SignUpForm
                ref={(ref) => (signUpFormRef = ref)}
                initialValues={signUpFromInitial}
                onEmailCheck={(email) => {
                  // console.log('checkEmail', email);
                  // signUpFormRef.form.setFieldError('email', 'email');
                  // checkEmailAsync(email)
                }}
                onSubmit={() => {
                  console.log('------')
                  // signUpFormRef.form.handleSubmit();
                  // setActiveView('SignIn');
                  // setLoginInitial({ email: 'some@example.com', password: 'some' });
                }}
              />
            </Formik>
          }

          {modalState == 'Auth'
            ? <div>
              <br />

              <div className="text-area _flx">
                Already have account?
                <div className='linkEl to-h-14'
                  onClick={() => {
                    if (activeView == 'SignIn') {
                      setActiveView('SignUp');
                    } else {
                      setActiveView('SignIn');
                    }
                  }}
                >{activeView == 'SignIn' ? 'Sign up' : 'Sign in'}</div>
              </div>
            </div> : null}
        </AppModal.Body>
      </AppModal>

      {/* <AuthenticationModal
        modal={modal}
        onHide={(e) => {
          setModal(false);
          authModalRef.close();
        }}

        ref={(ref) => (authModalRef = ref)}

        onAction={(e, form) => {
          authModalRef.activeForm.submitForm();

          authModalRef.activeForm.validateForm().then(r => {
            if (!Object.entries(r).length) {
              runAsync(authModalRef.activeForm.values.email, authModalRef.activeForm.values.password);
            }
          });

        }}
      /> */}

    </Fragment>
  )
}
