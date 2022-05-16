import { mapChildsWithKey } from '@/modules/module.utils';
import Button from '@/ui/Shared/Button/Button';
import { SwitchComponentProps } from '@/utils/utils';
import EventEmitter from 'eventemitter3';
import { memo, useEffect, useRef, useState } from 'react';
import {AppModal} from '@/ui/Shared';
import { BlockListContext, BlockListDispatchs, BlockListModel } from './BlockListContext';

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
      <p>Managaer Header</p>
    </div>
    <div className="blocklist-header--actions _flx divide-h-6">
      <Button variant='primary' onClick={props.open}>Add new item</Button>
      <Button variant='primary'>Manage</Button>
      <Button variant='primary'>Delete</Button>
    </div>
  </div>
}


export const ManagerActionButtonss = (props) => {
  const onClickOut = (e) => {
    // dispatch([1,2,3])
    // console.log('props', props)
    props.onAction(e);
  }

  return (
    <div className='_flx'>
      <Button variant='outline' size='small' onClick={() => onClickOut({ action: 'EDIT', value: props.el })} >edit</Button>
      <Button variant='outline' size='small' onClick={() => onClickOut({ action: 'DELETE', value: props.el })} >delete</Button>
      <Button variant='outline' size='small'>move</Button>
    </div>
  )
}

export const ManagerActionButtons = ManagerActionButtonss

export function TodoItem(props: any) {
  const { item, actionButtons }: any = props ?? {};
  const ActionButtons = actionButtons;
  const actionsArea = useRef(null);

  return (
    <div className='todo-item todo-item--wrap'>
      <div className="todo-item--content">
        <p>manager todo</p>
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
        <ManagerActionButtons onAction={props.onAction} />
      </div>
    </div>
  )
}

interface NewDispatchs {
  type: 'DELETE' | 'EDIT' | 'MOVE',
  payload: any;
}

interface ManagerBlockListModel extends BlockListModel {
  managareList: any[];
}


export const ManagerBlockListComponent: any = (props) => {
  const [show, setShow] = useState(false);
  const [todoList, dispatch] = BlockListContext.use<ManagerBlockListModel, NewDispatchs>();

  useEffect(() => {
    let reducerKey: any = { key: 'ManagerReducer' };

    // console.log("Manager init", props);

    BlockListContext.addReducer<NewDispatchs>(reducerKey, (state, { type, payload }) => {
      switch (type) {
        case 'DELETE':
          const newList = state.list.filter((e) => e.id !== payload.id);
          return { ...state, list: newList };
          break;
        default:
          return { ...state }
          break;
      }
    })

    Emitter.on("onAction", (e) => {
      console.log("Action", e);
      dispatch({
        type: "DELETE",
        payload: e.value
      })
    })

    return () => {
      console.log("Manager unmount");
      // BlockListContext.deleteReducer(reducerKey);
      reducerKey = null;
      Emitter.off("onAction")
    }
  }, []);

  // useEffect(() => {
  //   console.log("todoList Changed", todoList.list, BlockListContext.state.list, BlockListContext.isReady);
  // }, [todoList.list]);

  return <div className='container-xl'>
    <BlockListHeader open={() => setShow(true)} />
    <AppModal
      show={show}
      aria-labelledby="modal-1-label"
      onHide={() => setShow(false)}
    >
      <div>
        <h4 id="modal-1-label">Alert!</h4>
        <p>Some important content!</p>
        <button
          onClick={() => setShow(false)}
          className="float-right"
        >
          Close
        </button>
      </div>
    </AppModal>
  </div>
};

export const ManagaerBlockList = (props: SwitchComponentProps) => {

  const propsBinding = {
    BlockList: {
      onAction: (e) => {
        Emitter.emit('onAction', e);
      }
    }
  }

  // console.log("----", props.children)
  const _childs: any = mapChildsWithKey(propsBinding, props.children);

  return <div key="BlockListWrap">
    <ManagerBlockListComponent />
    {_childs.BlockList.target}
  </div>;
}
