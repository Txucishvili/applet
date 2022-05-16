
// const APP_DEFAULT_THEME = 'simple';

// if (!localStorage.getItem("local_theme")) {
//   window.localStorage.setItem("local_theme", APP_DEFAULT_THEME);
// } else if (localStorage.getItem("local_theme") !== APP_DEFAULT_THEME) {
//   window.localStorage.setItem("local_theme", APP_DEFAULT_THEME);
// }

const appBootConfig = {};

const bootConfig =  () => {
  const userToken = localStorage.getItem("user_token") ?? null;
  const _localWidgets: any = localStorage.getItem('widgets') ?? JSON.stringify([]);

  const localWidgets: any = JSON.parse(_localWidgets);

  // console.log('localWidgets', localWidgets)
  
  Object.assign(appBootConfig, {
    userToken: userToken,
    localWidgets
  });

  console.log('[App booting]', appBootConfig);

  return appBootConfig;
}


export {
  bootConfig
};