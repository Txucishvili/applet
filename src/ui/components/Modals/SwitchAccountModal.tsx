import user from '@/schemes/user';
import AuthService, { IUser } from '@/services/AuthService';
import { AppModal, Button } from '@/ui/Shared';
import { EventConfig, EventConfigAction, EventMap } from '@/utils/types';
import classNames from 'classnames';
import React, { memo } from 'react';

type onModalClose = { action: "onModalClose", value: boolean };
type openUserAdd = { action: "openUserAdd", value: boolean };
type removeUser = { action: "removeUser", value: any };
type addUser = { action: "addUser", value: { userName: string } };
type setUser = { action: "setUser", value: any };

type ConfigActions = onModalClose
  | openUserAdd
  | removeUser
  | addUser
  | setUser;

export type SwitchModalActions = EventMap<ConfigActions>;
export type SwitchModalActionsProps = EventConfig<ConfigActions>;

export interface ISwitchModalProps {
  show: boolean;
  user: IUser;
  onAction: EventMap<ConfigActions>;
}

function SwitchAccountModal(props: ISwitchModalProps) {
  const { show, onAction, user } = props;
  console.log("🚀 ~ file: SwitchAccountModal.tsx ~ line 31 ~ SwitchAccountModal ~ show", show)

  return (
    <div>
      <AppModal
        onHide={() => {
          onAction('onModalClose', false)
        }}
        show={show}
      >
        <div className='switch-user--modal'>
          <div className="switch-user--content">

            <div className="switch-user--list">
              {user.id && !user.usersList.length
                ? <div
                  onClick={(e) => {

                    onAction('setUser', user);
                  }}
                  className={
                    classNames('switch-user--item', user.email == user.email ? 'active' : '')
                  }>
                  <div className="switch-user--item--wrap">
                    <div className="switch-user--avatar">
                      {user.email?.charAt(0)}
                    </div>
                    <div className="switch-user--name">
                      <div className="main">{user.email}</div>
                      <div className="username">{user.firstName}</div>
                    </div>
                    <div className="switch-user--actions">
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        onAction('removeUser', { user: user, token: user.token })
                      }} variant='danger' size='small' text='remove' />
                    </div>
                  </div>
                </div> : null}
              {user.usersList.map((u) => {
                return <div
                  onClick={(e) => {

                    onAction('setUser', u);
                  }}
                  key={u.id} className={
                    classNames('switch-user--item', u.email == user.email ? 'active' : '')
                  }>
                  <div className="switch-user--item--wrap">
                    <div className="switch-user--avatar">
                      {u.email?.charAt(0)}
                    </div>
                    <div className="switch-user--name">
                      <div className="main">{u.email}</div>
                      <div className="username">{u.firstName}</div>
                    </div>
                    <div className="switch-user--actions">
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        onAction('removeUser', { user: u, token: u.token })
                      }} variant='danger' size='small' text='remove' />
                    </div>
                  </div>
                </div>
              })}
            </div>
            <div className="btn-wrap">
              <Button variant="light" wide onClick={() => {
                onAction('openUserAdd', true)
              }}>Add new user</Button>
            </div>

          </div>
        </div>
      </AppModal>
    </div >
  )
}
export default memo(SwitchAccountModal, (prev, next) => {
  if (prev.show !== next.show || prev.user.id !== next.user.id || prev.user.usersList.length !== next.user.usersList.length) {
    return false;
  }
  return false;
})