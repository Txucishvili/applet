import { DynamicStore } from '@/services';
import Fetch from "@/API";
import globalComponents from "@/schemes";
import ModulesService from "./ModulesService";
import DynamicContextCreator from ".";
import ThemeService from "./Theme";


const UserState = {
  userName: null,
  token: null,
  email: null,
  roles: null,
  type: null,
  theme: null
};

export const UserStore = new DynamicStore('User', UserState, (state, action) => {
  const {
    type, payload
  } = action;

  switch (type) {
    case "SET_USER":
      return { ...state, ...payload };
      break;
    case "SET_SIGNOUT":
      return UserState;
      break;

    default:
      break;
  }
});

class UserServices {
  public userState = {
    userName: null,
    email: null
  };

  signIn(username, password) {
    const target = username == "manager" ? "/AuthenticationManager.json" : '/Authentication.json';
    return new Promise(async r => {
      const user = await Fetch(target, { username, password });
      localStorage.setItem("user_token", username);
      await ModulesService.loadAppFor(user.type);
      UserStore.dispatcher({
        type: "SET_USER",
        payload: user
      });
      ThemeService.setTheme(user.theme)
      r(user);
    })
  }

  signOut() {
    return new Promise((r) => {
      localStorage.setItem("user_token", "");
      const local_theme = localStorage.getItem("local_theme");

      UserStore.dispatcher({
        type: "SET_USER",
        payload: UserState
      });

      ThemeService.setTheme(local_theme);
      r(UserState)
    })
  }
}

const UserService: any = new UserServices();

export default UserService;