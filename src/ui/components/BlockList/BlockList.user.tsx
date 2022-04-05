import React, { createElement, createFactory, useEffect, useRef } from 'react';
import { BlockListContext } from './BlockListContext';

const withMangerRule = (props: any) => {
  return (c) => {
    BlockListContext._reducer = (state, { type, payload }) => {
      switch (type) {
        case 'set':
          return { ...state, list: payload.list };
          break;
        case 'delete':
          return { ...state, list: state.list.filter((todo, i) => i !== payload.key) }
          break;
        default:
          return { ...state }
          break;
      }
    }

    return c;
  }
}

export function TodoItem(props: any) {
  const { item, actionButtons }: any = props ?? {};
  const ActionButtons = actionButtons;
  const actionsArea = useRef(null);

  return (
    <div className='todo-item todo-item--wrap'>
      <div className="todo-item--content">
        <h1 style={{
          fontSize: 24,
          fontWeight: 600
        }}>
          {item.id}
        </h1>
        <div style={{ marginTop: 4 }}>
          {item.title}
        </div>
      </div>
      <div ref={actionsArea} className="todo-item--actions">
        <UserActionButtons />
      </div>

    </div>
  )
}

export const UserBlockList: any = (props) => {
  useEffect(() => {
    console.log("[ManagerBlockList]", props);

    return () => {
    }
  }, []);


  return <div>
    <p>User Title</p>
    {/* {memorized} */}
  </div>
}

export const UserActionButtons = (props) => {
  const onClickOut = (e) => {
    // dispatch([1,2,3])
    console.log(props)
    props.actions.onEdit();
  }

  return (
    <div>
      <button onClick={() => onClickOut({ action: 'edit', value: null })} >edit</button>
    </div>
  )
}

const ruleConfig = {
  name: "manager",
  actionButtons: UserActionButtons,
}

export default withMangerRule(ruleConfig);
