import globalComponents from '@/modules';
import { useUser } from '@/store/context/UserContext';
import React, { createElement, createRef, useContext, useEffect, useRef, useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { BlockListContext, ListContextEl, useBlockList } from './BlockListContext';


const BlockListWrapper: any = (props) => {
  const { onAction, list } = props;
  const [todoList, dispatch] = ListContextEl.useContext();
  const [user, setUser] = useUser();
  const [state, setState] = useState([])

  useEffect(() => {
    const _localTodos: any = localStorage.getItem('todos') ?? [];
    const localTodos: any = [].concat(JSON.parse(_localTodos));
    dispatch(localTodos);
    // dispatch(localTodos);
  }, []);

  useEffect(() => {
    if(user.type == 'manager') {
      // dispatch(todoList.list);
    }
  }, [user])
  
  // const BlockListRender = BlockList({ ...props, ListItem: TodoItem });

  return <div>
    {todoList.list.length}
    <BlockList list={todoList.list} />
  </div>;
};

const wrapWithProps = (props) => {
  return (c) => {
    const ComponentReturn = createElement(c, props)
    return ComponentReturn
  }
}

const TodoComponent: any = (props) => {

  const [user, setUser] = useUser();
  let actionButtons: any = null;

  if (!!user && user.roles) {
    if (user.type == "manager") {
      // console.log("HIT", globalComponents['manager'].BlockList.BlockItem.ActionButtons);
      actionButtons = globalComponents['manager'].BlockList.BlockItem.ActionButtons();
    } else {
      actionButtons = globalComponents['user'].BlockList.BlockItem.ActionButtons();
    }
  }

  return wrapWithProps({ actionButtons: actionButtons, ...props })(TodoItem)
};


const BlockList = (props: any) => {
  const { list } = props;
  // const [todoList, dispatch] = useContext(BlockListContext);
  
  // console.log("[BlockList]", todoList)

  return <div className='container-fluid'>
    <div className="row">
      {list.map((todo, key) => {
        return <div key={key} className="col-md-4">
          <TodoComponent item={todo} />
        </div>
      })}
    </div>
  </div>;

};

export default BlockListWrapper;
