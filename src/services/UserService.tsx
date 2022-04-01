import Fetch from "@/API";
import globalComponents from "@/modules";
import ModulesService from "./ModulesService";

interface UserServiceInterface {
}

class ContextState {
}


class UserServices extends ContextState {
  public userState = {
    userName: null,
    email: null
  };

  signIn(username, password) {
    const target = username == "manager" ? "/AuthenticationManager.json" : '/Authentication.json';
    return new Promise(async r => {
      const user = await Fetch(target, { username, password });
      // console.log(user);

      if (user.type == 'manager') {
        await ModulesService.loadManagerModules();
        r(user);

        return;
      }

      if (user.type == 'user') {
        // console.log("------");
        await ModulesService.loadUserModules();
        r(user);

        return;
      }
    })
  }
}

const UserService = new UserServices();

export default UserService;