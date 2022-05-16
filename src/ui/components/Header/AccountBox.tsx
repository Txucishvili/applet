import { DropDown, Button, Menu, Divider } from "@/ui/Shared"
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { AuthService, UserStore } from "@/services/AuthService"
import { UserService } from "@/services/API"
import classNames from "classnames"
import { useState } from "react"


const AccountBox = (props) => {
  const [user,] = UserStore.use();
  const [dropdonw, setDrop] = useState(false);

  return <div className="user-area user-area--dropper">
    <DropDown open={dropdonw}>
      <DropDown.Dropper>
        <div className='user--toggle'>

        </div>
      </DropDown.Dropper>
      <DropDown.Body>
        <div className="user--body">

          <Menu>
            <Menu.ListItem>
              <div className="icon">
                <FontAwesomeIcon icon={solid('user')} />
              </div>
              <p>Profile</p>
            </Menu.ListItem>
            <Menu.ListItem>
              <div className="icon">
                <FontAwesomeIcon icon={solid('sliders')} />
              </div>
              <p>Perferences</p>
            </Menu.ListItem>
            <Menu.ListItem>
              <div className="icon">
                <FontAwesomeIcon icon={solid('gear')} />
              </div>
              <p>Settings</p>
            </Menu.ListItem>
            <Divider />
            {user.usersList.length > 1
              ? <div>
                {user.usersList.map((u: any) => {
                  return <Menu.ListItem
                    className={classNames({ 'active': u.id == user.id })}
                    onClick={() => {
                      AuthService.userSet({ user: u, token: u.token });
                    }} key={u.id}>
                    <div className="user-avatar"></div>
                    <p>{u.firstName}</p>
                  </Menu.ListItem>
                })
                }
                <Divider />
              </div>
              : null}
            <Menu.ListItem
              onClick={() => {
                props.openModal('');
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={solid('users-gear')} />
              </div>
              <p>Manage accounts</p>
            </Menu.ListItem>
            <Menu.ListItem
              onClick={() => {
                AuthService.userRelease();
              }}
            >
              <div className="icon">
                <FontAwesomeIcon color="var(---red-500)" icon={solid('right-from-bracket')} />
              </div>
              <p>Log out</p>
            </Menu.ListItem>
          </Menu>

        </div>
      </DropDown.Body>
    </DropDown>
  </div>
}

export default AccountBox;