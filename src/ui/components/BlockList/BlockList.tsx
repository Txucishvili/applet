import React, { createElement, createRef, forwardRef, memo, useContext, useEffect, useRef, useState } from 'react';
import globalComponents from '@/schemes';
import TodoItem from '../TodoItem/TodoItem';
import { BlockListContext } from './BlockListContext';
import { UserStore } from '@/services/UserService';

const wrapWithProps = (props) => {
  return (c) => {
    const ComponentReturn = () => {
      return createElement(c, props);
    }
    return ComponentReturn
  }
}

const BlockListRender: any = (props) => {
  const [user, setUser] = UserStore.useContext();
  console.log("user", user)

  if (!!user && user.type) {
    console.log(globalComponents[user.type].BlockList.wrapper)
    const el = wrapWithProps({ ...props, ...globalComponents[user.type].BlockList.BlockItem })((globalComponents[user.type].BlockList.wrapper ? globalComponents[user.type].BlockList.wrapper(BlockList) : BlockList))();
    return el;
  }

  return wrapWithProps({ ...props })(BlockList)();
}
const RenderItem: any = (props, ref) => {
  // console.log("----------", props, ref)
  const [user, setUser] = UserStore.useContext();


  if (!!user && user.type) {
    const el = wrapWithProps({ ...props })((globalComponents[user.type].BlockList.BlockItem.Item))();
    return el;
  }

  return wrapWithProps({ ...props })(TodoItem)();
};

const BlockList = (props: any) => {
  const [todoList, dispatch] = BlockListContext.useContext();

  const ref: any = useRef(RenderItem);
  
  useEffect(() => {
    const _localTodos: any = localStorage.getItem('todos') ?? [];
    const localTodos: any = [].concat(JSON.parse(_localTodos));
    dispatch({
      type: 'set',
      payload: {
        list: localTodos.slice(0, 50)
      }
    });

    
  }, []);
  

  const onClick = (e) => {
    dispatch({
      type: e.action,
      payload: {
        key: e.value
      }
    })
  }
  

  return <div className='container-fluid'>
  {/* <p>BlockList</p> */}

    <div className="row">
      {!!todoList.list && todoList.list.length ? todoList.list.map((todo, key) => {
        return <div key={key} className="col-md-4">
          <RenderItem item={todo} />
        </div>
      }) : null}
    </div>
  </div>;

};


const MemoBlockList = React.memo(BlockListRender, () => true);

export default MemoBlockList;
