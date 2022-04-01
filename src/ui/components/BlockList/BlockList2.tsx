import globalComponents from '@/modules';
import { useUser } from '@/store/context/UserContext';
import { render } from '@testing-library/react';
import React, { createElement, createRef, useContext, useEffect, useRef, useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { BlockListContext, ListContext, ListContextEl, useBlockList } from './BlockListContext';

interface Blc {
  reducer: any;
}

function BlockListComponent(this: any, reducer) {
  this.state = { count: 0 };
  this.name = "1";

  this.reducer = reducer;
  this.context = new ListContext(this.state, this.reducer);

  this.render = () => {
    const [state, dispatch] = this.context.useContext();

    useEffect(() => {
      console.log("hit")
    }, [])

    useEffect(() => {
      console.log("hit 2 ")
    }, [state])

    return <div>
      <p>Some component</p>
      <p>{state.count}</p>
      <button onClick={() => {
        dispatch();
      }}>change</button>
    </div>
  }
}

export const BlockC: any = new BlockListComponent((state, payload) => {
  console.log("some reducer");
  return Object.assign({ state }, { count: state.count + 1 });
});

BlockC.name = "changed";

console.log("block", BlockC)