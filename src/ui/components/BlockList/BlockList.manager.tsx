import React, { createElement, createFactory, memo, useEffect, useMemo, useRef } from 'react';
import { BlockListContext } from './BlockListContext';

const wrapWithProps = (props) => {
  return (c) => {
    const ComponentReturn = () => {
      useEffect(() => {
        console.log("init")
      }, [])
      return createElement(c, props);
    }
    return ComponentReturn
  }
}

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

    return wrapWithProps(props)(c);
  }
}

export const ManagerActionButtons = (props) => {
  const onClickOut = (e) => {
    // dispatch([1,2,3])
    props.actions(e);
  }

  return (
    <div>
      <button onClick={() => onClickOut({ action: 'edit', value: props.el })} >edit</button>
      <button onClick={() => onClickOut({ action: 'delete', value: props.el })} >delete</button>
      <button>move</button>
    </div>
  )
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
        <div style={{marginTop: 4}}>
        {item.title}
        </div>
      </div>
        <div ref={actionsArea} className="todo-item--actions">
          <ManagerActionButtons />
        </div>
    </div>
  )
}

const ruleConfig = {
  name: "manager",
  actionButtons: ManagerActionButtons,
}

export default withMangerRule(ruleConfig);
