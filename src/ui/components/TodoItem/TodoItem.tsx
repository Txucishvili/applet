import React, { useRef } from 'react'
import './TodoItem.scss'

export default function TodoItem(props: any) {
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
        {item.key}
        </h1> 
        <div style={{marginTop: 4}}>
        {item.title}
        </div>
      </div>
      {actionButtons ?
        <div ref={actionsArea} className="todo-item--actions">
          {actionButtons}
        </div>
        : null}

    </div>
  )
}
