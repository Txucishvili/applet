import React, { createElement, useEffect, useRef } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { BlockListContext, BlockListDispatchs, BlockListModel } from './BlockListContext';
import { globalComponents } from '@/services/ModuleService';
import './BlockList.scss'
import { ListAPI } from '@/API/ListsAPI';
import Button from '@/ui/Shared/Button/Button';
import { WidgetsAPI } from '@/API/WidgetsAPI';
import { WidgetsModule } from '@/services/WidgetService';
import { UserStore } from '@/services/AuthService';

const cloneArray = (index, array: any) => {
  const arr: any = [];
  for (let i = 0; i < index; i++) {
    arr.push(...array)
  }
  return arr.map((e, i) => {
    return {
      ...e,
      key: i
    }
  });
}

const wrapWithProps = (props) => {
  return (c) => {
    const ComponentReturn = () => {
      return createElement(c, props);
    }
    return () => {
      return createElement(c, props);
    }
  }
}
const RenderItem: any = (props, ref) => {
  // console.log("----------", props, ref)
  const [user, setUser] = UserStore.use();


  if (!!user && user.type) {
    // console.log("props", props)
    const el = wrapWithProps({ ...props })((globalComponents['module'].BlockList.BlockItem.Item))();
    return el;
  }

  return wrapWithProps({ ...props })(TodoItem)();
};

// const RenderItemComponent = (props) => {
//   return <RenderItem onAction={(e) => {
//     props.onAction({
//       ...e,
//       value: todo
//     });
//   }} item={todo} />
// }

const BlockList = (props: any) => {
  const [todoList, dispatch] = BlockListContext.use();

  useEffect(() => {

    if (!todoList.list.length && !todoList.isLoading) {
      dispatch({
        type: "SET_LOADER",
        payload: true
      });
  
      ListAPI.fetchAll().then(r => {
        const array = cloneArray(1, r);
  
        dispatch({
          type: 'SET',
          payload: {
            list: array
          }
        });
      })
    }


    return () => {
    }
  }, []);

  const refreshList = () => {
    dispatch({
      type: "SET_LOADER",
      payload: true
    });

    ListAPI.fetchAll().then(r => {
      const array = cloneArray(1, r);

      dispatch({
        type: 'SET',
        payload: {
          list: array.slice(0, 20)
        }
      });
    })
  }

  const installWidget1 = async () => {
    await WidgetsModule.setWidgets('Widget1');
  }
  
  const uninstall = async () => {
    await WidgetsModule.removeWidgets('Widget1');
  }

  const Comp = globalComponents['module'] && globalComponents['module'].BlockList.BlockItem.Item ? globalComponents['module'].BlockList.BlockItem.ActionButtons : null;


  return <div className='container-xl'>
    {/* <Button variant='primary' text='refresh' onClick={refreshList} />
    <Button variant='primary' text='add widget 1' onClick={installWidget1} />
    <Button variant='primary' text='uninstall widget 1' onClick={uninstall} />
    <br /> */}
    {todoList.isLoading ? 'loading...' : null}
    <div className="row">
      {todoList.list.length ? todoList.list.map((todo, key) => {
        return <div key={key} className="col-md-4">
          <div className='todo-item todo-item--wrap'>
            <div className="todo-item--content">
              <h1 style={{ fontSize: 24, fontWeight: 600 }}>
                {todo.id}
              </h1>
              <div style={{ marginTop: 4 }}>
                {todo.title}
              </div>
            </div>
            {globalComponents['module'] && globalComponents['module'].BlockList ?
              <div className="todo-item--actions">
                <Comp onAction={(e) => {
                  props.onAction({ ...e, value: todo });
                }} />
              </div>
              : null}

          </div>
        </div>
      }) : <div className='col-md-12'> No List items </div>}
    </div>
  </div>;

};


export default BlockList;
