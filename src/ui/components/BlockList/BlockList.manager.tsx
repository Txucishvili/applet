import { useUser } from '@/store/context/UserContext';
import React, { createRef, useContext, useRef } from 'react';
import BlockList from './BlockList.user';
import { BlockListContext, ListContextEl } from './BlockListContext';

export enum Events {
  SET_TITLE = 'set_title'
  // use an enum to keep track of events similar to action types set as variables in redux
};

export const eventEmitter = {
  _events: {},
  dispatch(event, data) {
    if (!this._events[event]) return;
    this._events[event].forEach(callback => callback(data))
  },
  subscribe(event, callback: (data) => any) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  unsubscribe(event) {
    if (!this._events[event]) return;
    delete this._events[event];
  }
};


eventEmitter.subscribe('onAction', (e) => {
  console.log("subscribe form", e)
})


export const ManagerActionButtons = (props) => {
  const onClickOut = (props) => {
    // dispatch([1,2,3])
    eventEmitter.dispatch('onAction', {someData: true});
  }

  return (
    <div>
      <button onClick={() => onClickOut({ action: 'edit', value: null })} >edit</button>
      <button onClick={() => onClickOut({ action: 'delete', value: null })} >delete</button>
      <button>move</button>
    </div>
  )
}

export default {};
