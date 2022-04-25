import { cloneDeep } from 'lodash';
import { HTTPSuccess, HTTPSuccessType, HTTPErrorType, HTTPError } from './index';

// local 

const InitialUsers = [
  {
    "username": "User",
    "token": "user",
    "email": "user@mail.com",
    "roles": ["user"],
    "type": "user",
    "theme": "theme-custom",
    "widgets": ["Widget1"]
  },
  {
    "username": "Manager",
    "token": "manager",
    "email": "manager@mail.com",
    "roles": ["user", "manager"],
    "type": "manager",
    "theme": "theme-default",
    "widgets": ["Widget1", "Widget2"]
  }
]

export class UsersLocalData {
  usersList: any[] = [];
  currentUser: any = {};

  constructor() {
    if (!localStorage.getItem('usersList')) {
      localStorage.setItem("usersList", JSON.stringify(InitialUsers));
    }

    const localData: any = localStorage.getItem('usersList');
    this.usersList = [...JSON.parse(localData)];
  }

  _addToStorage(user) {
    const _newData = this.usersList.concat(user);
    localStorage.setItem('usersList', JSON.stringify(_newData));
  }

  _update() {
    localStorage.setItem('usersList', JSON.stringify(this.usersList));
  }


  //

  signIn(email): any {
    const currentUser = this.usersList.find((u) => u.email == email);

    if (!currentUser) {
      return new Promise((r, reject) => {
        reject(new HTTPError({
          statusCode: 401,
          status: 'User not found'
        }))
      })
    }

    this.currentUser = currentUser;
    
    return new Promise((r, reject) => {
      r(new HTTPSuccess({
        data: currentUser,
      }))
    })
    
  }

  register(user) {
    this._addToStorage(user);
  }

  getUserInfo(token) {
    const currentUser = this.usersList.find((u) => u.token == token);
    this.currentUser = currentUser;

    return new Promise((r) => r(new HTTPSuccess({
      data: currentUser,
      status: true
    })))
  }

  updateUserInfo(email, newInfo) {
    Object.assign(this.currentUser, newInfo);

    console.log("Request for updating", newInfo);
    console.log("-----------", this.currentUser);
    console.log("-------------", this.usersList)
    this._update();
    
  }


}

export const UsersLocalDataAPI = new UsersLocalData();