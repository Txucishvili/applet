import React, { createRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { AppModal, Button } from '@/ui/Shared'
import { AuthService, UserStore } from '@/services/AuthService';
import classNames from 'classnames';
import DropDown from '@/ui/Shared/DropDown';
import AccountBox from './AccountBox';
import { IAuthFormProps, SignInForm, SignUpForm } from '../Forms/AuthorizationForms';
import { useRequest } from 'ahooks';
import UserAPI from '@/services/API/AuthAPI';
import { ModalHandle } from '@restart/ui/cjs/Modal';
import { AuthenticationModal, ModalActive } from '../Modals/AuthenticationModal';
import SwitchAccountModal, { SwitchModalActionsProps } from '../Modals/SwitchAccountModal';

export type ModalState = 'Auth' | 'AddNewUser';

export default function UserInfo() {
  const [user, setUser] = UserStore.use();
  const [modal, setModal] = useState(false);
  const [modalState, setModalState] = useState<ModalState>('Auth');
  const [activeView, setActiveView] = useState<ModalActive>("SignIn");
  const [switchModal, setSwitchModal] = useState(false);

  const isMounted = useRef<boolean>(false);

  let authModalRef: any = createRef();
  let formRef: any = createRef();
  let signInFormRef: any = createRef();
  let signUpFormRef: any = createRef();

  const { runAsync, loading } = useRequest(UserAPI.signIn, {
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

  useEffect(() => {
    console.log('appModalRef', authModalRef);
    isMounted.current = true;
  }, [])

  const openSignIn = () => {
    setModal(true);
    setActiveView('SignIn')
    // authModalRef.openSignIn();
    // modalState = 'Auth';
  }

  const openSignUp = () => {
    setActiveView('SignUp')
    setModal(true);
    // authModalRef.openSignUp();
  }

  useEffect(() => {
      if (!isMounted) {
        return
      }
      setModalState(switchModal ? 'AddNewUser' : 'Auth');

  }, [switchModal])

  useEffect(() => {
    if (!modal) {
      setInitialValues({email: '', password: ''})
    }
  }, [modal])
  
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

  const [signInInitalValues, setInitialValues] = useState({email: '', password: ''})
  
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
                    runAsync(signInFormRef.form.values.email, signInFormRef.form.values.password);
                  }
                });
              }}
            />
            : <SignUpForm
              ref={(ref) => (signUpFormRef = ref)}
              onSubmit={(e) => {
                setTimeout(() => {
                  console.log('{FORM VALID}', e, signInFormRef);
                }, 1500);
                signUpFormRef.form.submitForm();

                signUpFormRef.form.validateForm().then(r => {
                  console.log('signUpFormRef.form', signUpFormRef.form)

                  if (!Object.entries(r).length) {
                    setInitialValues({
                      email: signUpFormRef.form.values.email,
                      password: signUpFormRef.form.values.password
                    })
                    setActiveView('SignIn')
 
                  }
                });
              }}
            />}

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
