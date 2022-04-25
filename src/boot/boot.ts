// import ModulesService from '@/services/ModulesService';
// before app boot config
// import ModulesService from '@/services/ModulesService';
// import '@sass/_theme.scss';

import { UsersLocalDataAPI } from "@/API/UsersAPI";


export const checkUser = async (token) => {
  const url = token !== 'manager' ? '/api/Authentication.json' : '/api/AuthenticationManager.json';
  const user = fetch(url).then(r => r.json());

  const Localuser = UsersLocalDataAPI.getUserInfo(token);
  // console.log("Localuser", Localuser)
  
  return Localuser;
}

const APP_DEFAULT_THEME = 'theme-simple';

if (!localStorage.getItem("local_theme")) {
  window.localStorage.setItem("local_theme", APP_DEFAULT_THEME);
} else if (localStorage.getItem("local_theme") !== APP_DEFAULT_THEME) {
  window.localStorage.setItem("local_theme", APP_DEFAULT_THEME);
}

const appBootConfig = {};

const bootConfig =  () => {
  const localTheme = localStorage.getItem("local_theme");
  const userToken = localStorage.getItem("user_token") ?? null;
  let theme = localTheme;

  // if (!!userToken) {
  //   const _user = checkUser(userToken);

  //   if (!!_user) {
  //     Object.assign(user, _user);
  //     theme = user.theme;
  //   }
  // }

  Object.assign(appBootConfig, {
    theme: {
      theme
    },
    userToken: userToken
  });
  console.log('[App booting]', appBootConfig);

  return appBootConfig;
}


export {
  bootConfig
};