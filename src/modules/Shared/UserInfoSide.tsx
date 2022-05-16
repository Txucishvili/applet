import { AuthService } from "@/services/AuthService";
import { Button } from "@/ui/Shared";
import { Fragment, useContext, useEffect, useState } from "react";
import { useInRouterContext, useLocation, useNavigate, useOutlet, useOutletContext, useParams, useRoutes } from "react-router-dom"

export const SignOutButton = (props) => {
  let navigate = useNavigate();
  let RouterContext = useLocation();

  useEffect(() => {
    // console.log('SignOutButton---------------------', props.user.usersList)

    return () => {
    }
  }, [props.user])

  return <Fragment>
    {/* {props.user.usersList.length ?
      props.user.usersList.map((user) => {
        return <div key={user.id}>
          <Button
            variant={user.email == props.user.email ? 'secondary' : 'primary'}
            size="small"
            onClick={() => {
              // navigate('/', {replace: true});

              AuthService.userSet({ user: user, token: user.token });
            }}>
            {user.email}
          </Button>
          <Button
            variant={'danger'}
            size="small"
            onClick={() => {
              AuthService.userRemove(user.email);
            }}>
            remove
          </Button>
        </div>
      })
      : null} */}

    {/* <AuthenticationModal
      modal={modal}
      activeModal={activeModal}
      setActiveModel={(e) => setActiveModal(e)}
      onHide={(e) => {
        setModal(false);
        setActiveModal('login')
      }}
      onClose={(e) => {
        setModal(false);
        setActiveModal('login')
      }}
      onSignIn={async (e) => {
        // setModal(false);
        // setActiveModal('login')
        await AuthService.userAdd(e.data);
      }}
      onSignUp={() => {
        // setActiveModal('login')
      }}
    /> */}
  </Fragment>
}