import { AppModal } from "@/ui/Shared";
import React, { useState, createRef, useImperativeHandle } from "react";
import { SignInForm, SignUpForm } from "../Forms/AuthorizationForms";

export type ModalActive = 'SignIn' | 'SignUp';

enum Some {
  FN,
  SOME
}

const SwitchForm = {
  SignIn: SignInForm,
  SignUp: SignUpForm,
}

interface ISwitchFormProps {
  onAction: any;

}

export const AuthenticationModals = (props, ref) => {
  const { onHide, modal } = props;
  const [activeView, setActiveView] = useState<ModalActive>("SignIn");

  let appModalRef: any = createRef();

  console.log('appModalRef', appModalRef)

  useImperativeHandle(ref, () => ({
    openSignUp: () => {
      console.log('object');
      setActiveView('SignUp')
    },
    openSignIn: () => {
      console.log('object');
      setActiveView('SignIn')
    },
    close: () => {
      setActiveView('SignIn')
    },
    activeForm: appModalRef.form
  }));

  return <AppModal
    keyboard={true}
    onHide={() => {
      onHide()
    }}
    show={modal}
    size="auto"
  >
    <AppModal.Body size='auto'>
      <AppModal.Head>
        <div className="modal--title">
          {activeView == 'SignUp' ? 'Create new account' : 'Sign In'}
        </div>
      </AppModal.Head>

      {activeView == 'SignIn'
        ? <SignInForm
          ref={(ref) => (appModalRef = ref)}
          onSubmit={() => {
            props.onAction("SignIn", appModalRef);
          }}
        />
        : <SignUpForm
          ref={(ref) => (appModalRef = ref)}
          onSubmit={() => {
            props.onAction("SignUp", appModalRef);
          }}
        />}

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
    </AppModal.Body>
  </AppModal>
}

export const AuthenticationModal = React.forwardRef(AuthenticationModals);
