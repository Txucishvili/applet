import { useUser } from '@/store/context/UserContext';
import React, { createRef, useRef } from 'react';
import TodoItem from '../TodoItem/TodoItem';

interface Props {
  list: any[]
}

const withRules = (c) => {
  return c;
}

const ActionButtons = (props) => {
  console.log('[ActionButtons]', props);
  const { rules } = props;

  return (
    <div>
      {rules.includes("edit") ? <button onClick={() => props.onAction({action: 'edit', value: null})} >edit</button> : false}
    </div>
  )
}

const TodoWithRule: any = (props) => {
  const { onActions, item } = props;
  const [user, setUser] = useUser();

  const onAction = (action) => {
    console.log('[onAction]', action);
  }


  const todoProps: any = { item, actionButtons: null };
  const TodoRender = TodoItem;

  if (!!user.roles && user.roles.includes("manager")) {
    // console.log("object", TodoRender({item}))
    todoProps.actionButtons = ActionButtons({ onAction: (e) => onActions({...e, value: item.id}), rules: ['edit', 'delete', 'move'] });
  } else if (!!user.roles && user.roles.includes("user")) {
    todoProps.actionButtons = ActionButtons({ onAction, rules: ['edit'] });
  }

  console.log("todoProps", todoProps)

  return withRules(TodoRender(todoProps));
}


const BlockList = (props: any) => {
  const { list } = props;

  const onActions = (e) => {
    // const key = list.indexOf(list.find(i => i.id == e.value));
    // list.splice(key, 0);
    // props.onAction(key);
    console.log('OnTodoListAction', e, list);
  }

  return <div className='container-fluid'>
    <div className="row">
      {list.map((todo, key) => {
        return <div key={key} className="col-md-4">
          <TodoWithRule onActions={(e) => onActions(e)} item={todo} />
        </div>
      })}
    </div>
  </div>;
};


export const UserActionButtons = (props) => {
  return (
    <div>
       <button onClick={() => props.onAction({action: 'edit', value: null})} >edit</button> 
    </div>
  )
}

export default {};
