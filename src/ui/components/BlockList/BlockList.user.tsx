import { mapChildsWithKey } from '@/modules/module.utils';
import React, { createElement, createFactory, memo, useCallback, useEffect, useRef, useState } from 'react';
import { cloneElement } from 'react';
import { BlockListContext } from './BlockListContext';
import EventEmitter from 'eventemitter3';
import Button from '@/ui/Shared/Button/Button';

let eventEmitter = new EventEmitter();

const Emitter = {
  addListener: (event, fn) => eventEmitter.addListener(event, fn),
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn?) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload),
  removeListener: (event, payload) => eventEmitter.removeListener(event, payload)
}
Object.freeze(Emitter);


export const BlockListHeader = (props) => {
  return <div key="header-wrap2" className='blocklist-header--wrap'>
    <div key="header-wrap3" className="blocklist-header--title">
      <p>User Header</p>
    </div>
    <div className="blocklist-header--actions _flx divide-h-6">
      <Button variant='primary'>Add new item</Button>
      <Button variant='primary'>Edit by id</Button>
    </div>
  </div>
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
        <UserActionButtons onAction={props.onAction} />
      </div>

    </div>
  )
}

export const UserActionButtonss = (props) => {
  const onClickOut = (e) => {
    // dispatch([1,2,3])
    // console.log(props)
    props.onAction(e)
  }

  return (
    <div>
      <button onClick={() => onClickOut({ action: 'edit', value: null })} >edit</button>
    </div>
  )
}
export const UserActionButtons = memo(UserActionButtonss, () => true)


export const UserBlockListComponent: any = (props) => {
  const [state, setstate] = useState(0)
  const [value, setSome] = BlockListContext.use()

  useEffect(() => {
    // console.log("user init", BlockListContext.state);

    Emitter.on('onAction', (v) => {
      updateState(Math.random())
    });

    return () => {
      // eventEmitter = new EventEmitter();
      Emitter.off('onAction')
    }
  }, []);

  useEffect(() => {
    console.log("state", state);
  }, [state]);


  const updateState = useCallback(
    (v) => {
      setstate(v);
      // BlockListContext.dispatch({
      //   type: 'some',
      //   payload: {
      //     value: v
      //   }
      // })
    },
    [state],
  )

  return <div className='container-xl'>
    <BlockListHeader key="header-wrap" />
    {props.children}
  </div>;
};

export const UserBlockList = (props) => {
  // const { children } = props;

  // console.log("props", props)

  const propsBinding = {
    BlockList: {
      onAction: (e) => {
        console.log("hit", e)
        Emitter.emit("onAction", e);
      }
    }
  }
  const _childs: any = mapChildsWithKey(propsBinding, props.children);

  return <div key="BlockListWrap">
    <UserBlockListComponent />
    {_childs.BlockList.target}
  </div>;
}

export default {};
