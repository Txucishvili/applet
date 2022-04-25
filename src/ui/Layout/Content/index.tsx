import React, { Fragment, memo, useEffect, useMemo } from 'react';
import UserServices, { UserStore } from '@/services/UserService';
import UserService from '@/services/UserService';
import Header from '@/ui/Layout/Header';
import globalComponents from '@/schemes';

interface Props {
}


const RenderComponent = (props) => {
  let { target, component, type } = props;
  const [user, setUser]: any = UserStore.useContext();

  if (user.roles && type == 'switcher') {
    target = user.roles !== null ? user.roles[user.roles.length - 1] : []
  }


  useEffect(() => {
    console.log("--------------- conditional renderer")
  }, [user])

  if (typeof globalComponents[target] !== "undefined") {
    return React.createElement(globalComponents[target][component]['component'], {
      key: 'block._uid',
    });
  }

  return React.createElement(
    () => <div>The component has not been created yet.</div>,
    { key: "block._uid" }
  );
}

const RenderComponents = () => {
  return (
    <div>
      <MemoRender target="user" component="UserComponent" />
      <MemoRender target="manager" component="ManagerComponent" />
      {/* {user && user.roles && user.roles.includes('manager') ? <MemoRender target="manager" component="ContentView" /> : <MemoRender target="user" component="ContentView" />} */}
      <MemoRender type="switcher" target="manager" component="SharedComponent" />
    </div>
  )
}

const MemoRender = React.memo((props: any) => RenderComponent(props));

const Content = (props: any) => {
  
  return <Fragment>
    <div className="layout--content">
      <Header />
      <div className="layout--body">
        <div className="container-fluid">
        {props.children}
        </div>
      </div>

    </div>
  </Fragment>;
};

export default Content;
