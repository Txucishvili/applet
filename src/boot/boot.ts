// import ModulesService from '@/services/ModulesService';
// before app boot config
// import ModulesService from '@/services/ModulesService';
// import '@sass/_theme.scss';


const checkUser = (token) => {
  const url = token !== 'manager' ? '/api/Authentication.json' : '/api/AuthenticationManager.json';
  const user = fetch(url).then(r => r.json());
  return user;
}

if (!localStorage.getItem("local_theme")) {
  window.localStorage.setItem("local_theme", 'theme-light');
}

const appBootConfig = {};

const bootConfig = async () => {

  const localTheme = localStorage.getItem("local_theme");
  const userToken = localStorage.getItem("user_token") ?? null;
  const user: any = {};
  let theme = localTheme;

  if (!!userToken) {
    const _user = await checkUser(userToken);

    if (!!_user) {
      Object.assign(user, _user);
      theme = user.theme;
    }
  }

  Object.assign(appBootConfig, {
    theme: {
      theme
    },
    userToken: userToken,
    user
  });
  console.log('[App booting]', appBootConfig);

  return appBootConfig;
}


export {
  bootConfig
};