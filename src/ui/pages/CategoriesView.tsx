import React, { useEffect, useState } from 'react'
import BlockList from '../components/BlockList/BlockList'
import BlockListProvider, { ListContext, ListContextEl, useBlockList } from '../components/BlockList/BlockListContext';

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


export default function CategoriesView() {
  // const [todos, setTodos] = useState([])
  // const [todosAll, setAllTodos] = useState([])
  console.log("object")

  // useEffect(() => {
  //   const _localTodos: any = localStorage.getItem('todos') ?? [];
  //   const localTodos: any = [].concat(JSON.parse(_localTodos));

  //   const clonedArray = cloneArray(125, localTodos);

  //   console.log('localTodos', clonedArray);

  //   // setAllTodos(clonedArray);

  // }, [])

  // useEffect(() => {
  //   // updateTodos(0, 200);
  // }, [todosAll])

  const updateTodos = (s, e) => {
    // const n = todosAll;
    // const n = todosAll.slice(s, e);
    // setTodos(todos.concat(n))
  }

  const onListAction = (e: number) => {
    // var array = [...todos];
    // array.splice(e, 1);
    // setTodos(array);

    // console.log("---", todos)
  }

  return (
    <div>
      <ListContextEl.Provider>
        <BlockList onAction={(e) => onListAction(e)} list={[]} />
      </ListContextEl.Provider>
    </div>
  )
}