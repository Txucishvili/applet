import ModulesService from "./ModuleService";
import ThemeService from "./ThemeService";
import { DynamicStoreState } from "@/store";
import { RemoveField } from "@/utils/types";

enum UserRoles {
  "user" = 0,
  "manager" = 1,
}

export interface IUserModel {
  userName: string | null,
  firstName: string | null,
  token: string | null,
  email: string | null,
  roles: string | null,
  type: string | null,
  theme: string | null,
  id: string | null,
  usersList: IUsersList;
}
export interface IUser extends IUserModel {
  usersList: IUsersList;
}

export type IUsersList = RemoveField<IUser, 'usersList'>[];

const initialUserState: IUser = {
  userName: null,
  firstName: null,
  token: null,
  email: null,
  roles: null,
  type: null,
  theme: null,
  id: null,
  usersList: []
};

interface IUserWithToken {
  token: string;
  user: IUserModel;
}

const UserState = { ...initialUserState };

export const UserStore = new DynamicStoreState('User', UserState, (state, action) => {
  const {
    type, payload
  } = action;
  let newUserLists: any[] | null = payload.user ? state.usersList.filter((u: any) => u.email != payload.user.email) : null;
  const userListItem = payload.user ? state.usersList.find((u: any) => u.email === payload.user.email) : null;
  const currentListItem = state.usersList.find((u: any) => u.email === state.email);

  switch (type) {
    case "SET_USER":
      return { ...state, ...payload, token: payload.token };
      break;
    case "SET_SIGNOUT":
      return { ...initialUserState, usersList: state.usersList };
      break;
    case "ADD_USER":
      if (state.email == payload.user.email) {
        return { ...state }
      }

      let currentUser: any;
      let prevUser: any;
      const { usersList, ...prevActiveUser } = state;

      if (userListItem) {
        currentUser = userListItem;
        prevUser = [];
        if (!currentListItem && prevActiveUser.email !== null) {
          prevUser = prevActiveUser;
        }
      } else {
        currentUser = payload.user;
        currentUser.token = payload.token;
        prevUser = [currentUser];
        if (!currentListItem && prevActiveUser.email !== null) {
          prevUser = prevUser.concat(prevActiveUser);
        }
      }
      return { ...state, ...currentUser, usersList: state.usersList.concat(prevUser) };
      break;
    case "REMOVE_USER":
      let returnUsers;

      return { ...state, returnUsers, usersList: newUserLists };
      break;
    case "REMOVE_USER_SIGNOUT":
      return { ...initialUserState, usersList: newUserLists };
      break;
    default:
      return { ...state };
      break;
  }
});

class AuthServices {
  public userState = {
    userName: null,
    email: null
  };
  userStore: IUser | null = null;

  constructor(props: IUserWithToken) {
    if (props.user) {
      this.userStore = { ...props.user, token: props.user.token };
    }
  }

  async userSet(userObj: IUserWithToken) {
    console.log('[userSet]', userObj)
    return this._userSet(userObj)
      .then((user: IUserWithToken) => {
        UserStore.dispatch({
          type: "SET_USER",
          payload: { ...user.user, token: user.token }
        });
      })
  }

  userRelease() {
    console.log('[ReleaseUser]', UserStore.state)
    return this._userRelease().then(r => {
      UserStore.dispatch({
        type: "SET_SIGNOUT",
        payload: initialUserState
      });
    })
  }

  tokenReleas() {
    localStorage.removeItem("user_token");
  }

  async userAdd(userObj: IUserWithToken) {

    if (!userObj.token) {
      return;
    }
    
    const localUserss = localStorage.getItem('local_users');
    const localUsers: any[] = JSON.parse(localUserss ?? JSON.stringify([]));
    let localList: any[] = [];
    if (this.userStore && this.userStore.email) {
      if (userObj.user.email != this.userStore.email && !localUsers.find(e => e.user.email == userObj.user.email)) {
        if (!localUsers.find(e => e.user.email == this.userStore?.email)) {
          localList = localList.concat({ user: this.userStore, token: this.userStore.token });
        }
        localList = localList.concat(userObj);
      }
    } else {
      if (!localUsers.find(e => e.user.email == userObj.user.email)) {
        localList = localList.concat(userObj);
      }
    }



    localStorage.setItem('local_users', JSON.stringify(localUsers.concat(localList)));

    // localStorage.setItem('local_users', JSON.stringify(localUsers.concat(targetList)));

    return this._userSet(userObj)
      .then(user => {
        UserStore.dispatch({
          type: "ADD_USER",
          payload: userObj
        });
      })
  }

  async userRemove(email: string) {
    return new Promise((r) => {
      const localUserss = localStorage.getItem('local_users');
      const localUsers: any[] = JSON.parse(localUserss ?? JSON.stringify([]));

      if (localUsers.find((u: any) => u.user.email === email)) {
        localStorage.setItem('local_users', JSON.stringify(localUsers.filter((u) => u.user.email !== email)));
      }


      if (this.userStore && email == this.userStore.email) {
        this._userRelease().then(r => {
          UserStore.dispatch({
            type: "REMOVE_USER_SIGNOUT",
            payload: { user: { email } }
          });
        })
      } else {
        UserStore.dispatch({
          type: "REMOVE_USER",
          payload: { user: { email } }
        });

      }
    })
  }

  async _userSet(userObj: IUserWithToken): Promise<IUserWithToken> {
    return new Promise(async r => {
      const { user, token } = userObj;
      user.type = UserRoles[user.roles ?? 0];

      await ModulesService.switchModule(user).then(async () => {
        localStorage.setItem("user_token", userObj.token);

        await ThemeService.setTheme(user.theme);
        this.userStore = {...user, token: userObj.token};

        r(userObj);

      });
    })
  }

  async _userRelease(): Promise<any> {
    console.log('[ReleaseUser]', UserStore.state)
    return new Promise((r) => {

      this.tokenReleas();

      ThemeService.setDefaultTheme();
      ModulesService.deleteModule();
      this.userStore = null;
      // !!!!
      r({});
    })
  }
}
export let AuthService: AuthServices;

export const initilizeUserService = (cfg: IUserWithToken) => {
  const localUsers: IUserWithToken[] = JSON.parse(localStorage.getItem('local_users') ?? JSON.stringify([]));

  Object.assign(UserState,
    !!cfg && cfg.user && cfg.user.roles != null ?
      {
        ...cfg.user,
        token: cfg.token,
        type: UserRoles[cfg.user.roles]
      }
      : {},
    {
      usersList: localUsers
        .map((u) => ({ ...u.user, token: u.token }))
    });
  AuthService = new AuthServices({ user: cfg.user, token: cfg.token });
}

export default AuthServices;