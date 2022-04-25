import { DynamicStore } from '@/services';
import Fetch from "@/API";
import globalComponents from "@/schemes";
import ModulesService from "./ModuleService";
import DynamicContextCreator from ".";
import ThemeService from "./ThemeService";
import { UsersLocalDataAPI } from '@/API/UsersAPI';


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
      // const user = await Fetch(target, { username, password });
      const userResp = await UsersLocalDataAPI.signIn(username + '@mail.com');
      const user = userResp.data;
      
      await ModulesService.switchModule(user).then(async () => {
        localStorage.setItem("user_token", username);

        await ThemeService.setTheme(user.theme)

        UserStore.dispatcher({
          type: "SET_USER",
          payload: user
        });
      });


      r(user);
    })
  }

  signOut() {
    return new Promise((r) => {
      localStorage.setItem("user_token", "");
      const local_theme = localStorage.getItem("local_theme");

      ThemeService.setTheme(local_theme);
      UserStore.dispatcher({
        type: "SET_USER",
        payload: UserState
      });

      ModulesService.deleteModule()
      r(UserState)
    })
  }
}

const UserService: any = new UserServices();

export default UserService;